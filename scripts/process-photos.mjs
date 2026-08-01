// Reads photos/<service-slug>/*.{jpg,jpeg,png} and writes optimized web copies to
// public/img/gallery/<service-slug>/. Run with `npm run photos` whenever photos/ changes.
import { readdir, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC_DIR = path.join(ROOT, 'photos');
const OUT_DIR = path.join(ROOT, 'public/img/gallery');
const SKIP_DIRS = new Set(['not needed', 'videos']);
const SIZES = [
  { suffix: '', width: 1600, quality: 82 },
  { suffix: '-thumb', width: 640, quality: 78 },
];

const isImage = (name) => /\.(jpe?g|png)$/i.test(name);

async function processDir(slug) {
  const srcDir = path.join(SRC_DIR, slug);
  const outDir = path.join(OUT_DIR, slug);
  await mkdir(outDir, { recursive: true });

  const files = (await readdir(srcDir)).filter(isImage).sort();
  for (const file of files) {
    const base = path.basename(file, path.extname(file));
    const srcPath = path.join(srcDir, file);

    for (const { suffix, width, quality } of SIZES) {
      const image = sharp(srcPath).rotate().resize({ width, withoutEnlargement: true });
      await image.clone().jpeg({ quality, mozjpeg: true }).toFile(path.join(outDir, `${base}${suffix}.jpg`));
      await image.clone().webp({ quality }).toFile(path.join(outDir, `${base}${suffix}.webp`));
    }
    console.log(`  ${slug}/${file}`);
  }
  return files.length;
}

async function main() {
  if (!existsSync(SRC_DIR)) {
    console.error(`No photos/ directory at ${SRC_DIR}`);
    process.exit(1);
  }
  const entries = await readdir(SRC_DIR, { withFileTypes: true });
  const serviceDirs = entries
    .filter((e) => e.isDirectory() && !SKIP_DIRS.has(e.name))
    .map((e) => e.name)
    .sort();

  let total = 0;
  for (const slug of serviceDirs) {
    console.log(`Processing ${slug}...`);
    total += await processDir(slug);
  }
  console.log(`\nDone. Processed ${total} photos across ${serviceDirs.length} categories into public/img/gallery/`);
}

main();
