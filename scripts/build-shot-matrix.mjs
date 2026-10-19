import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const matrix = JSON.parse(await readFile(resolve(root, 'content/shot-to-section-matrix.json'), 'utf8'));
const registry = JSON.parse(await readFile(resolve(root, 'content/source-registry.json'), 'utf8'));
const assets = new Map(registry.assets.map((a) => [a.id, a]));
const lines = ['# Shot-to-section matrix', '', 'Generated with `npm run assets:matrix` from the packaged reference map and current source registry. Candidate assignments are not publication approval. No crop or text-safe area is approved without original pixels.', ''];
let count = 0;
for (const page of matrix.pages) {
  lines.push(`## ${page.route}`, '', `Reference: desktop ${page.desktopFigmaNode}; mobile ${page.mobileFigmaNode}.`, '', '| Reference section | Planned component | Candidate media / current state | Fidelity constraint |', '| --- | --- | --- | --- |');
  for (const section of page.sections) {
    const statuses = section.candidateAssetIds.map((id) => {
      const asset = assets.get(id);
      if (!asset) throw new Error(`Unknown asset ID: ${id}`);
      return `${id}: ${asset.location.status === 'location-conflict' ? 'QUARANTINED' : asset.downloadStatus}`;
    });
    const cell = (value) => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
    lines.push(`| ${cell(section.referenceSection)} | ${cell(section.proposedComponent)} | ${cell(statuses.join('; ') || 'Text / verified evidence required')} | ${cell(section.note)} |`);
    count += 1;
  }
  lines.push('');
}
await writeFile(resolve(root, 'docs/SHOT_TO_SECTION_MATRIX.md'), lines.join('\n') + '\n');
console.log(`Generated ${matrix.pages.length} route plans / ${count} reference sections.`);
