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
  }) => {
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
  });
}

test('sources remain accessible and evidence disclosures work by keyboard', async ({
  page,
}) => {
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
});
