import { defineConfig, devices } from '@playwright/test';
import { fileURLToPath } from 'node:url';

// Use the test runner's Node version, including when the shell's npm is unavailable.
const shellQuote = (value: string) => `'${value.replaceAll("'", "'\\''")}'`;
const astroCLI = fileURLToPath(
  new URL('./node_modules/astro/bin/astro.mjs', import.meta.url),
);
const testPort = Number(process.env.SWAT_TEST_PORT ?? 4321);
if (!Number.isInteger(testPort) || testPort < 1024 || testPort > 65535) {
  throw new Error('SWAT_TEST_PORT must be an integer from 1024 to 65535');
}
const testOrigin = `http://127.0.0.1:${testPort}`;

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL: testOrigin, trace: 'retain-on-failure' },
  workers: 2,
  projects: [320, 390, 768, 1024, 1440, 1920].map((width) => ({
    name: `chromium-${width}`,
    use: {
      ...(width <= 390 ? devices['Pixel 7'] : devices['Desktop Chrome']),
      viewport: { width, height: width <= 390 ? 844 : 1000 },
    },
  })),
  webServer: {
    command: `${shellQuote(process.execPath)} ${shellQuote(astroCLI)} preview --host 127.0.0.1 --port ${testPort} --ignore-lock`,
    url: testOrigin,
    reuseExistingServer: false,
  },
});
