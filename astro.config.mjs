import { defineConfig } from 'astro/config';

// Supply the real deployment origin explicitly; never invent a canonical host.
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
