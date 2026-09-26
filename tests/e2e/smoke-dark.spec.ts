import { test, expect } from '@playwright/test';

for (const route of ['/', '/discovery', '/calendar', '/characters', '/theories', '/gigs', '/collections', '/login', '/register', '/forgot-password', '/about', '/terms', '/contact']) {
  test(`shell and responsive layout: ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(route);
    await expect(page.getByRole('navigation', { name: 'Main navigation', exact: true })).toHaveCount(1);
    await expect(page.getByRole('main')).toHaveCount(1);
    await expect(page.locator('h1')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    expect(errors).toEqual([]);
  });
}
test('mobile navigation opens and Escape closes it', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile menu only');
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Menu', exact: true });
  await toggle.click(); await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape'); await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
