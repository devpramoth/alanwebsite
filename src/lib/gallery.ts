import { readdirSync } from 'node:fs';
import path from 'node:path';

// Alt text per photo, written from what's actually in each shot. Index matches the
// NN suffix in public/img/gallery/<slug>/<slug>-NN.jpg (1-based).
export const GALLERY_ALT_TEXT: Record<string, string[]> = {
  'kitchen-fitting-berlin': [
    'White shaker kitchen with patterned tile splashback and oak worktop, fitted in a Berlin Altbau flat',
    'Close-up of fitted kitchen units with under-cabinet lighting and tiled splashback',
    'Duck-egg green fitted kitchen with black and white tiled floor',
    'White fitted kitchen with black countertop and matching splashback',
    'Modern kitchen with black countertop, white cabinets and oak flooring',
  ],
  'painting-decorating-berlin': [
    'Freshly painted mustard-yellow room with original Berlin window and radiator',
    'Room mid-decoration with botanical wallpaper going up',
    'Close-up of gold dragonfly-pattern wallpaper',
    "Painter's ladder and dust sheets in a mustard-yellow hallway during decorating work",
  ],
  'tiling-berlin': [
    'New tiled floor being laid, spirit level checking the fall',
    'Bathroom wall tiling in progress with tile spacers',
    'Finished fireplace surround with blue and white star-pattern tiles',
    'Small tiled floor area being laid with a spirit level checking the line',
    'Blue mosaic wall tiling in progress with a tape measure checking alignment',
    'Cream floor tiles being laid over exposed subfloor',
  ],
  'electrician-berlin-english': [
    'Electrical socket back box fitted into a plastered wall mid-renovation',
    'First-fix wiring with three back boxes set into drywall ahead of plastering',
  ],
  'drywall-partition-walls-berlin': ['Fitting tongue-and-groove wood wall panelling'],
  'flooring-parquet-vinyl-berlin': [
    'Restored herringbone parquet corridor in a Berlin Altbau flat',
    'Empty room with sanded and refinished parquet flooring',
    'Wide room with new wood plank flooring',
    'Bright room with new flooring and full-height window onto a balcony',
    'Laying new flooring against a textured feature wall',
    'Self-levelling floor screed poured ahead of new flooring',
    'Large open room with dark refinished parquet flooring',
    'Corridor with restored parquet flooring lit by a window',
    'Patch repair to herringbone parquet flooring',
    'Freshly cleaned herringbone parquet floor',
    'Freshly sanded and refinished wood plank flooring',
  ],
  'bathroom-renovation-berlin': [
    'Finished bathroom with blue and white star-pattern tiled floor',
    'Waterproof tanking membrane applied to a shower corner before tiling',
    'Overhead view of a tiled shower floor and drain',
    'Bathroom mid-demolition with old tiles stripped back',
    'Exposed pipework during a bathroom first fix',
    'Waterproof membrane applied in a shower corner ahead of tiling',
    'Overhead view of a finished bathroom with dark tiling, vanity and toilet',
    'Finished bathroom with toilet and glass shower screen',
    'Bathroom stripped back to brick and debris during a renovation',
    'Small bathroom being painted teal, with a new mirror cabinet fitted and protective tape still up',
    'Finished bathroom with white metro tiles and bathtub',
    'First-fix electrical box set into cement board ahead of bathroom tiling',
    'Exposed copper pipework with the toilet cistern removed during a bathroom first fix',
    'Insulation board fitted against a tanked bathroom wall ahead of tiling',
    'Tiled shower niche corner with two shower valves fitted',
    'Waterproof membrane applied to a shower tray ahead of tiling',
    'Tanked shower corner with copper pipework exposed',
    'Finished bathroom with pale green walls, white metro tiles and glass shower screen',
    'Grey tanking membrane applied around a wall-mounted frame ahead of tiling',
    'Waterproof membrane applied to shower walls ahead of tiling',
    'Finished corner shower enclosure with glass doors and tiled floor',
    'Close-up of a tiled shower floor with a linear drain',
    'Finished bathroom with blue and white star-pattern tiled floor, toilet and sink',
    'Pipe stub-outs set into cement board for shower valves, with a waste outlet marked out ahead of bathroom tiling',
  ],
  'apartment-renovation-berlin': [
    'Long hallway with mustard-yellow walls and restored wood flooring',
    'Barrel-vaulted attic ceiling under construction with scaffold tower',
    'Room stripped back to original lath and plaster during renovation',
    'Floor opened up to expose old pipework during a strip-out',
    'Fitting insulation and wood panelling to an attic ceiling',
    'Installing panelling in an attic conversion, radiator visible',
    'Worker on scaffold inside a vaulted attic ceiling during construction',
    'Old distressed wood and brick wall before renovation',
    'Room stripped back to bare floorboards and walls before renovation',
    'Empty room stripped back to bare floorboards before renovation',
    'Built-in alcove shelving painted deep red as a feature',
    'Close-up of ornamental ceiling moulding under repair',
    'Wood bed frame being assembled in a newly renovated room',
  ],
};

export interface GalleryPhoto {
  n: number;
  base: string;
  alt: string;
}

const GALLERY_DIR = path.join(process.cwd(), 'public/img/gallery');

/** Photos available for a service slug, capped at `limit` if given. */
export function getGalleryPhotos(slug: string, limit?: number): GalleryPhoto[] {
  const alts = GALLERY_ALT_TEXT[slug];
  if (!alts?.length) return [];

  let files: string[];
  try {
    files = readdirSync(path.join(GALLERY_DIR, slug)).filter(
      (f) => f.endsWith('.jpg') && !f.includes('-thumb'),
    );
  } catch {
    return [];
  }

  const count = Math.min(files.length, alts.length, limit ?? Infinity);
  return Array.from({ length: count }, (_, i) => ({
    n: i + 1,
    base: `/img/gallery/${slug}/${slug}-${String(i + 1).padStart(2, '0')}`,
    alt: alts[i],
  }));
}
