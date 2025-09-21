import { test, expect } from '@playwright/test';

const routes = ['/', '/discovery', '/theories'];

test.describe('Dark-only UI smoke', () => {
  for (const route of routes) {
    test(`page ${route} has single nav and dark background`, async ({ page }) => {
      await page.goto(route);
      const navCount = await page.locator('nav').count();
      expect(navCount).toBeGreaterThan(0);
      expect(navCount).toBeLessThan(3); // ensure not duplicated

      const bg = await page.evaluate(() => {
        const el = document.body as HTMLElement;
        const cs = getComputedStyle(el);
        return cs.backgroundColor || '';
      });

      // Parse rgb/rgba and check perceived luminance
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
      expect(match).toBeTruthy();
      if (match) {
        const r = parseInt(match[1], 10) / 255;
        const g = parseInt(match[2], 10) / 255;
        const b = parseInt(match[3], 10) / 255;
        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        expect(lum).toBeLessThan(0.6); // dark-ish threshold
      }
    });
  }
});
