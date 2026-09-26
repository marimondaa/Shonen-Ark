import { test, expect } from '@playwright/test';

test('live anime search, manga switch, pagination and empty state', async ({ page }) => {
  await page.goto('/discovery');
  await page.getByRole('searchbox', { name: 'Search', exact: true }).fill('Naruto');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(page.getByRole('link', { name: 'Naruto ↗', exact: true })).toBeVisible();
  await page.getByRole('combobox', { name: 'Format', exact: true }).selectOption('manga');
  await expect(page.getByRole('link', { name: 'Naruto ↗', exact: true })).toHaveAttribute('href', /\/manga\//);
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(page.getByText('Page 2', { exact: true })).toBeVisible();
  await page.getByRole('searchbox', { name: 'Search', exact: true }).fill('zzzzunfindableark987654321');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'No matching results.' })).toBeVisible();
});
test('signed-out visitor cannot reach private content or submit a theory', async ({ page }) => {
  for (const route of ['/account/fan', '/collections', '/submit-theory', '/contact']) {
    await page.goto(route);
    await expect(page.getByRole('status')).toContainText('Sign in');
    await expect(page.getByRole('button', { name: 'Publish theory' })).toHaveCount(0);
  }
});
test('unfinished integrations are explicit instead of simulated', async ({ page }) => {
  await page.goto('/submit-video');
  await expect(page.getByRole('status')).toContainText('No upload, payment or publication is simulated');
});
