import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, relative, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = resolve(root, 'content/source-registry.json');
const registry = JSON.parse(await readFile(registryPath, 'utf8'));
const config = JSON.parse(await readFile(resolve(root, 'content/image-crops.json'), 'utf8'));
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const local = (path) => {
  const value = resolve(root, path);
  if (!value.startsWith(root + sep)) throw new Error('Path outside repository');
  return value;
};
const safeRect = (rect, width, height) => {
  if (!rect || !['left', 'top', 'width', 'height'].every((k) => Number.isInteger(rect[k]))) return false;
  return rect.left >= 0 && rect.top >= 0 && rect.width > 0 && rect.height > 0 && rect.left + rect.width <= width && rect.top + rect.height <= height;
};
const safeArea = (box) => box && ['x', 'y', 'width', 'height'].every((k) => Number.isFinite(box[k])) && box.x >= 0 && box.y >= 0 && box.width > 0 && box.height > 0 && box.x + box.width <= 1 && box.y + box.height <= 1;
let failures = 0;
let processed = 0;
for (const asset of registry.assets) {
  if (asset.location.status === 'location-conflict') {
    console.log(`Location conflict; no public derivatives for ${asset.id}`);
    continue;
  }
  if (asset.downloadStatus !== 'downloaded' || !asset.sha256) {
    console.log(`Missing original; skipped ${asset.id}`);
    continue;
  }
  try {
    const input = local(asset.localOriginalPath);
    const originalBytes = await readFile(input);
    if (hash(originalBytes) !== asset.sha256) throw new Error('Original SHA256 mismatch');
    const metadata = await sharp(originalBytes).metadata();
    if (!metadata.width || !metadata.height) throw new Error('No readable image dimensions');
    if (metadata.width !== asset.dimensions.width || metadata.height !== asset.dimensions.height) throw new Error('Decoded dimensions differ from source registry');
    if (metadata.orientation && metadata.orientation !== 1) throw new Error('EXIF orientation requires manual crop-coordinate review');
    const recipes = [{ id: 'uncropped', rect: null, textSafeArea: null }];
    for (const crop of config.heroCrops.filter((c) => c.assetId === asset.id)) {
      if (crop.status !== 'approved' || asset.location.status === 'location-conflict' || asset.visualReviewStatus !== 'reviewed') {
        console.log(`Hero crop blocked pending location/pixel review: ${crop.id}`);
        continue;
      }
      for (const mode of ['desktop', 'mobile']) {
        const value = crop[mode];
        if (!safeRect(value?.rect, metadata.width, metadata.height) || !safeArea(value?.textSafeArea)) throw new Error(`Invalid approved crop or safe area: ${crop.id}/${mode}`);
        recipes.push({ id: `${crop.id}-${mode}`, ...value });
      }
    }
    const derivatives = [];
    for (const recipe of recipes) {
      const sourceWidth = recipe.rect?.width ?? metadata.width;
      const widths = new Map();
      for (const displayWidth of config.responsiveDisplayWidths) {
        for (const density of config.densities) {
          const width = displayWidth * density;
          if (width > sourceWidth) continue; // Never label an upscaled or capped file as a real 2x derivative.
          const uses = widths.get(width) ?? [];
          uses.push({ displayWidth, density });
          widths.set(width, uses);
        }
      }
      // Always keep a native-size derivative for smaller originals (e.g. museum).
      if (!widths.has(sourceWidth)) widths.set(sourceWidth, [{ displayWidth: sourceWidth, density: 1 }]);
      for (const [width, uses] of widths) {
        for (const format of config.formats) {
          if (!['avif', 'webp'].includes(format)) throw new Error('Unsupported image format');
          let pipeline = sharp(originalBytes);
          if (recipe.rect) pipeline = pipeline.extract(recipe.rect);
          pipeline = pipeline.resize({ width, withoutEnlargement: true }).toColourspace('srgb');
          const output = format === 'avif' ? await pipeline.avif({ quality: 52, effort: 4 }).toBuffer({ resolveWithObject: true }) : await pipeline.webp({ quality: 80, effort: 4 }).toBuffer({ resolveWithObject: true });
          const name = `${asset.id}--${recipe.id}--w${width}.${format}`;
          const path = local(`public/images/${asset.id}/${name}`);
          await mkdir(dirname(path), { recursive: true });
          await writeFile(path, output.data);
          derivatives.push({
            path: relative(root, path), url: `/images/${asset.id}/${name}`, format,
            width: output.info.width, height: output.info.height, sha256: hash(output.data), bytes: output.data.length,
            uses, processing: { recipeId: recipe.id, rect: recipe.rect, textSafeArea: recipe.textSafeArea, colourspace: 'srgb', upscaled: false, sourceSha256: asset.sha256 },
          });
        }
      }
    }
    asset.derivatives = derivatives;
    asset.processing = [{ at: new Date().toISOString(), tool: 'sharp', versions: sharp.versions, operations: ['responsive resize', 'sRGB conversion', 'AVIF/WebP encoding'], originalModified: false, recipes: recipes.map((r) => r.id) }];
    // Processing is not editorial approval. Nothing here clears location/portrait/crop review.
    processed += 1;
    console.log(`Processed ${asset.id}: ${derivatives.length} derivatives; publication approval unchanged.`);
  } catch (error) {
    failures += 1;
    console.error(`Cannot process ${asset.id}: ${error.message}`);
  }
}
registry.updatedAt = new Date().toISOString();
await writeFile(registryPath, JSON.stringify(registry, null, 2) + '\n');
console.log(`${processed} originals processed; ${failures} failures. Missing originals remain missing.`);
if (failures) process.exitCode = 1;
