import { test, expect } from '@playwright/test';

test('the composition study exposes all six complete directions at the current width', async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const response = await page.goto('/art-direction/');
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    /A place is never\s*just a view\./,
  );
  await expect(page.locator('.study-page')).toHaveCount(6);
  await expect(page.locator('[data-reference-section]')).toHaveCount(37);
  await expect(page.locator('.study-interaction')).toHaveCount(5);
  await expect(page.locator('img, picture, canvas, audio, iframe')).toHaveCount(
    0,
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    'noindex, nofollow',
  );
  if (['chromium-390', 'chromium-1440'].includes(testInfo.project.name)) {
    await page.screenshot({
      path: `docs/qa/phase-b/study-${testInfo.project.name}.png`,
    });
    await page.screenshot({
      path: testInfo.outputPath('study-full.png'),
      fullPage: true,
    });
  }
  for (const id of [
    'home',
    'river',
    'history',
    'places',
    'people',
    'fieldnotes',
  ]) {
    const direction = page.locator(`.study-page[data-page="${id}"]`);
    await direction.locator('summary').click();
    await expect(direction).toHaveAttribute('open', '');
    await expect(
      direction.locator('[data-reference-section]').first(),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      id,
    ).toBe(true);
    await direction.locator('summary').click();
  }
  expect(errors).toEqual([]);
});

test('the study keeps keyboard and no-JavaScript access to its page directions', async ({
  page,
  browser,
  baseURL,
  viewport,
  isMobile,
  hasTouch,
}) => {
  await page.goto('/art-direction/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  const summary = page.locator('.study-page[data-page="places"] > summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.study-page[data-page="places"]')).toHaveAttribute(
    'open',
    '',
  );
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
    reducedMotion: 'reduce',
    viewport,
    isMobile,
    hasTouch,
  });
  const plain = await context.newPage();
  await plain.goto('/art-direction/');
  await plain.locator('.study-page[data-page="home"] > summary').click();
  await expect(
    plain
      .locator('.study-page[data-page="home"] [data-reference-section]')
      .first(),
  ).toBeVisible();
  expect(
    await plain.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await context.close();
});
