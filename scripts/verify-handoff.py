#!/usr/bin/env python3
"""Verify the retained archive against every extracted reference; never run packaged code."""
import hashlib
import json
import sys
import zipfile
from pathlib import Path, PurePosixPath

ROOT = Path(__file__).resolve().parent.parent
record = json.loads((ROOT / 'content/reference-registry.json').read_text())
archive = ROOT / record['archive']
if hashlib.sha256(archive.read_bytes()).hexdigest() != record['sha256']:
    sys.exit('Handoff archive checksum mismatch')
issues = []
with zipfile.ZipFile(archive) as bundle:
    for member in bundle.infolist():
        path = PurePosixPath(member.filename)
        if path.is_absolute() or '..' in path.parts or '\\' in member.filename:
            issues.append('Unsafe archive path: ' + member.filename)
            continue
        if member.is_dir():
            continue
        target = ROOT / 'reference' / member.filename
        if not target.is_file() or hashlib.sha256(target.read_bytes()).digest() != hashlib.sha256(bundle.read(member)).digest():
            issues.append('Missing or modified reference: ' + member.filename)
    print(f'{len(bundle.infolist())} archive entries verified against retained extraction.')
if issues:
    sys.exit('\n'.join(issues))
