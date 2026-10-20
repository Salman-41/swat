import { z } from 'zod';
import type { SourceAsset } from '../data/contracts.ts';

const text = z.string().trim().min(1);
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const positive = z.number().int().positive();
const localPath = (prefix: string) =>
  text.refine(
    (value) =>
      value.startsWith(prefix + '/') &&
      !value.includes('\\') &&
      value
        .split('/')
        .every((part) => part !== '..' && part !== '.' && part !== ''),
    'Expected a local path inside ' + prefix,
  );
const https = z.url().refine((value) => new URL(value).protocol === 'https:');
const rect = z.object({
  left: z.number().int().nonnegative(),
  top: z.number().int().nonnegative(),
  width: positive,
  height: positive,
});
const safeArea = z
  .object({
    x: z.number().min(0).max(1),
    y: z.number().min(0).max(1),
    width: z.number().positive().max(1),
    height: z.number().positive().max(1),
  })
  .refine((box) => box.x + box.width <= 1 && box.y + box.height <= 1);

export const sourceAssetSchema: z.ZodType<SourceAsset> = z.looseObject({
  id: text.regex(/^[a-z0-9-]+$/),
  title: text,
  sourcePageUrl: https.refine((value) => {
    const url = new URL(value);
    return (
      url.hostname === 'commons.wikimedia.org' &&
      url.pathname.startsWith('/wiki/File:')
    );
  }),
  localOriginalPath: localPath('assets/originals'),
  originalUrl: https
    .refine((value) => new URL(value).hostname === 'upload.wikimedia.org')
    .nullable(),
  photographer: text,
  license: z.object({
    name: text,
    url: https,
    verification: z.enum(['previous-record', 'verified-live']),
  }),
  dimensions: z.object({
    width: positive,
    height: positive,
    verification: z.enum([
      'previous-record',
      'source-page-recorded',
      'verified-original',
    ]),
  }),
  sha256: hash.nullable(),
  downloadStatus: z.enum(['missing', 'downloaded', 'failed']),
  location: z.object({
    claim: text,
    status: z.enum([
      'source-description-only',
      'location-conflict',
      'confirmed',
    ]),
    notes: z.array(text),
  }),
  rightsStatus: z.enum(['pending-original-verification', 'license-verified']),
  visualReviewStatus: z.enum(['pending', 'reviewed']),
  publicationApproved: z.boolean().optional(),
  derivatives: z.array(
    z
      .object({
        path: localPath('public/images'),
        url: text.refine(
          (value) =>
            value.startsWith('/images/') &&
            !/[\s,?#\\]/.test(value) &&
            !value.split('/').includes('..'),
        ),
        width: positive,
        height: positive,
        format: z.enum(['avif', 'webp']),
        sha256: hash,
        bytes: positive,
        uses: z.array(
          z.object({
            displayWidth: positive,
            density: z.union([z.literal(1), z.literal(2)]),
          }),
        ),
        processing: z.object({
          recipeId: text,
          rect: rect.nullable(),
          textSafeArea: safeArea.nullable(),
          colourspace: text,
          upscaled: z.literal(false),
          sourceSha256: hash,
        }),
      })
      .refine(
        (item) =>
          item.path === `public${item.url}` &&
          item.url.endsWith(`.${item.format}`),
        'Public image path, URL and format must agree',
      ),
  ),
  alt: text,
  caption: text,
  credit: text,
  processing: z.array(
    z.object({
      at: z.iso.datetime({ offset: true }),
      tool: text,
      versions: z.record(z.string(), z.string()),
      operations: z.array(text),
      originalModified: z.boolean(),
      recipes: z.array(text),
    }),
  ),
  sourceCheck: z.object({
    status: z.enum(['verified-live', 'pending']),
    checkedOn: z.iso.date().nullable(),
    retrievedOn: z.string().nullable(),
    metadataPath: localPath('assets/provenance').nullable(),
    sourceRevisionId: positive.nullable(),
    pageSnapshot: z
      .object({
        type: z.literal('html'),
        path: localPath('assets/provenance'),
        sha256: hash,
      })
      .nullable(),
    screenshot: z.string().nullable(),
    method: z.string().optional(),
  }),
  issues: z.array(text),
});

export const sourceRegistrySchema = z
  .looseObject({
    schemaVersion: z.literal(1),
    updatedAt: text,
    assets: z.array(sourceAssetSchema),
    missingSlots: z.array(
      z.object({
        id: text,
        role: text,
        status: text,
        reason: text,
        imageId: z.null(),
      }),
    ),
  })
  .superRefine((registry, context) => {
    const ids = new Set<string>();
    registry.assets.forEach((asset, index) => {
      if (ids.has(asset.id))
        context.addIssue({
          code: 'custom',
          message: 'Duplicate asset ID',
          path: ['assets', index, 'id'],
        });
      ids.add(asset.id);
    });
  });
