import { test, expect } from '@playwright/test';

const routes = [
  ['/', 'Home', 8],
  ['/river/', 'River', 5],
  ['/through-time/', 'Through Time', 5],
  ['/places/', 'Places', 5],
  ['/living-swat/', 'Living Swat', 5],
  ['/fieldnotes/', 'Fieldnotes', 4],
] as const;

for (const [path, title, sectionCount] of routes) {
  test(`${title} exposes its planned sequence without unpublished media`, async ({
    page,
  }, testInfo) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(
      page.getByRole('heading', { name: title, exact: true, level: 1 }),
    ).toBeVisible();
    await expect(page.getByLabel('Development status')).toBeVisible();
    await expect(page.locator('[data-section-kind]')).toHaveCount(sectionCount);
    await expect(page.locator('img, canvas, iframe')).toHaveCount(0);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex, nofollow',
    );
    await expect(page.locator('main')).toHaveAttribute('id', 'main');
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
    if (['chromium-390', 'chromium-1440'].includes(testInfo.project.name)) {
      await page.screenshot({
        path: testInfo.outputPath('narrative.png'),
        fullPage: true,
      });
    }
  });
}

test('sources remain accessible and evidence disclosures work by keyboard', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  const first = page
    .getByText('Evidence needed before publication', { exact: true })
    .first();
  await first.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('details').first()).toHaveAttribute('open', '');
  await page
    .getByRole('link', { name: 'Image source register and credits' })
    .click();
  await expect(page.locator('.credits-list > li')).toHaveCount(10);
  await expect(
    page.locator('.credits-list a[href^="https://commons.wikimedia.org/"]'),
  ).toHaveCount(10);
  await expect(page.locator('img')).toHaveCount(0);
  await expect(page.locator('.source-photo')).toHaveCount(10);
  await expect(page.locator('body')).not.toContainText('[object Object]');
  await expect(
    page.getByRole('heading', { name: 'What is still missing' }),
  ).toBeVisible();
  if (['chromium-390', 'chromium-1440'].includes(testInfo.project.name)) {
    await page.screenshot({
      path: `docs/qa/phase-a/sources-${testInfo.project.name}.png`,
    });
  }
});

test('all local navigation targets and anchors exist, including the not-found page', async ({
  page,
}) => {
  for (const path of [
    ...routes.map(([route]) => route),
    '/sources/',
    '/image-credits/',
    '/404.html',
  ]) {
    await page.goto(path);
    const links = await page
      .locator('a[href]')
      .evaluateAll((items) =>
        items
          .map((item) => item.getAttribute('href')!)
          .filter((href) => href.startsWith('/') || href.startsWith('#')),
      );
    for (const href of new Set(links)) {
      const url = new URL(href, page.url());
      if (url.pathname === new URL(page.url()).pathname && url.hash) {
        expect(
          await page
            .locator(`[id="${decodeURIComponent(url.hash.slice(1))}"]`)
            .count(),
          href,
        ).toBe(1);
      } else if (url.pathname !== '/404.html') {
        const response = await page.request.get(url.href);
        expect(response.ok(), href).toBe(true);
      }
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test('editorial structure and sources work without JavaScript and with reduced motion', async ({
  browser,
  baseURL,
  viewport,
  isMobile,
  hasTouch,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: 'reduce',
    baseURL,
    viewport,
    isMobile,
    hasTouch,
  });
  const page = await context.newPage();
  for (const [path, title] of routes) {
    await page.goto(path);
    await expect(
      page.getByRole('heading', { name: title, exact: true, level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByRole('navigation', { name: 'Main navigation' }),
    ).toBeVisible();
  }
  await page.goto('/sources/');
  await expect(page.locator('.credits-list > li')).toHaveCount(10);
  await expect(page.locator('picture, img, audio, canvas')).toHaveCount(0);
  await context.close();
});
