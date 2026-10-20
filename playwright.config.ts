import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4321', trace: 'retain-on-failure' },
  workers: 2,
  projects: [320, 390, 768, 1024, 1440, 1920].map((width) => ({
    name: `chromium-${width}`,
    use: {
      ...(width <= 390 ? devices['Pixel 7'] : devices['Desktop Chrome']),
      viewport: { width, height: width <= 390 ? 844 : 1000 },
    },
  })),
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4321 --ignore-lock',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: false,
  },
});
