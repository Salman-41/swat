#!/usr/bin/env python3
"""Download approved Commons originals; never infer a direct URL or clear editorial review."""
import argparse
import hashlib
import json
import re
import sys
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REGISTRY = ROOT / 'content/source-registry.json'
HEADERS = {'User-Agent': 'SwatEditorialSourceAudit/1.0 (licensed editorial photography)'}


class PlainText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []

    def handle_data(self, value):
        self.parts.append(value)


def plain(value):
    parser = PlainText()
    parser.feed(value or '')
    return ' '.join(' '.join(parser.parts).split())


def fetch(url, allowed_hosts, max_bytes=40_000_000):
    if urllib.parse.urlsplit(url).scheme != 'https':
        raise ValueError('HTTPS source required')
    if urllib.parse.urlsplit(url).hostname not in allowed_hosts:
        raise ValueError('Unexpected source host')
    with urllib.request.urlopen(urllib.request.Request(url, headers=HEADERS), timeout=20) as response:
        if urllib.parse.urlsplit(response.url).hostname not in allowed_hosts:
            raise ValueError('Unexpected redirect host')
        body = response.read(max_bytes + 1)
        if len(body) > max_bytes:
            raise ValueError('Download exceeds configured limit')
        return body


def local_path(value):
    result = (ROOT / value).resolve()
    if not result.is_relative_to(ROOT):
        raise ValueError('Path outside repository')
    return result


def atomic_write(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + '.part')
    temporary.write_bytes(data)
    temporary.replace(path)


def acquire(asset):
    parsed = urllib.parse.urlsplit(asset['sourcePageUrl'])
    if parsed.hostname != 'commons.wikimedia.org' or not parsed.path.startswith('/wiki/File:'):
        raise ValueError('Only approved Commons file pages are accepted')
    title = urllib.parse.unquote(parsed.path.split('/wiki/', 1)[1]).replace('_', ' ')
    query = urllib.parse.urlencode({
        'action': 'query', 'format': 'json', 'prop': 'imageinfo|revisions',
        'rvprop': 'ids', 'iiprop': 'url|size|sha1|extmetadata', 'titles': title,
    })
    raw = fetch('https://commons.wikimedia.org/w/api.php?' + query, {'commons.wikimedia.org'})
    result = json.loads(raw)
    pages = list(result.get('query', {}).get('pages', {}).values())
    if len(pages) != 1 or 'imageinfo' not in pages[0]:
        raise ValueError('File metadata unavailable; no replacement selected')
    page = pages[0]
    if page['title'].replace('_', ' ') != title:
        raise ValueError('File title changed; editorial source review required')
    info = page['imageinfo'][0]
    ext = info.get('extmetadata', {})
    creator = plain(ext.get('Artist', {}).get('value'))
    licence = plain(ext.get('LicenseShortName', {}).get('value'))
    licence_url = plain(ext.get('LicenseUrl', {}).get('value'))
    if not creator or not licence or not licence_url:
        raise ValueError('Missing creator or licence metadata')
    # Restrict automatic acquisition to the reuse licences approved for this project.
    if licence not in {'CC BY-SA 3.0', 'CC BY-SA 4.0', 'CC0', 'CC0 1.0'}:
        raise ValueError('Licence needs manual review: ' + licence)
    if 'creativecommons.org/' not in licence_url:
        raise ValueError('Licence URL needs manual review')
    snapshot = fetch(asset['sourcePageUrl'], {'commons.wikimedia.org'})
    original = fetch(info['url'], {'upload.wikimedia.org'})
    if not original.startswith(b'\xff\xd8\xff'):
        raise ValueError('Expected an original JPEG')
    if len(original) != info['size']:
        raise ValueError('Original byte count does not match Commons metadata')
    sha1 = hashlib.sha1(original).hexdigest()
    reported = info.get('sha1', '')
    if re.fullmatch(r'[0-9a-f]{40}', reported) and sha1 != reported:
        raise ValueError('Commons SHA1 mismatch')
    original_path = local_path(asset['localOriginalPath'])
    if not original_path.is_relative_to(ROOT / 'assets/originals'):
        raise ValueError('Original must be under assets/originals')
    folder = ROOT / 'assets/provenance' / asset['id']
    atomic_write(folder / 'commons-imageinfo.json', raw)
    atomic_write(folder / 'source-page.html', snapshot)
    digest = hashlib.sha256(original).hexdigest()
    changed = asset.get('sha256') != digest
    atomic_write(original_path, original)
    asset.update({
        'originalUrl': info['url'], 'photographer': creator,
        'license': {'name': licence, 'url': licence_url, 'verification': 'verified-live'},
        'dimensions': {'width': info['width'], 'height': info['height'], 'verification': 'verified-original'},
        'sha256': digest, 'downloadStatus': 'downloaded', 'rightsStatus': 'license-verified',
        'sourceCheck': {
            'status': 'verified-live', 'checkedOn': NOW[:10], 'retrievedOn': NOW,
            'metadataPath': str((folder / 'commons-imageinfo.json').relative_to(ROOT)),
            'sourceRevisionId': page.get('revisions', [{}])[0].get('revid'),
            'pageSnapshot': {'type': 'html', 'path': str((folder / 'source-page.html').relative_to(ROOT)),
                             'sha256': hashlib.sha256(snapshot).hexdigest()},
            'screenshot': None,
        },
    })
    if changed:
        asset['derivatives'] = []
        asset['processing'] = []
        asset['publicationApproved'] = False
        asset['visualReviewStatus'] = 'pending'
    asset.pop('fetchError', None)
    # Existing location conflicts and permission states intentionally remain untouched.


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--ids', nargs='+', help='Approved registry IDs to fetch; default: all')
    args = parser.parse_args()
    NOW = datetime.now(timezone.utc).isoformat()
    registry = json.loads(REGISTRY.read_text())
    known = {asset['id'] for asset in registry['assets']}
    if args.ids and set(args.ids) - known:
        parser.error('Unknown registry IDs')
    failed = []
    for asset in registry['assets']:
        if args.ids and asset['id'] not in args.ids:
            continue
        try:
            acquire(asset)
            print('Downloaded and hashed: ' + asset['id'], flush=True)
        except Exception as error:
            asset['fetchError'] = {'at': NOW, 'message': str(error)}
            if not asset.get('sha256') or not local_path(asset['localOriginalPath']).is_file():
                asset['downloadStatus'] = 'failed'
            failed.append(asset['id'])
            print('Unavailable: ' + asset['id'] + ' — ' + str(error), file=sys.stderr, flush=True)
    registry['updatedAt'] = NOW
    atomic_write(REGISTRY, (json.dumps(registry, indent=2) + '\n').encode())
    if failed:
        print(str(len(failed)) + ' originals unavailable; registry preserves explicit missing states.', file=sys.stderr)
        sys.exit(1)
