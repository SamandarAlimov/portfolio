import { expect, test } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

test('desktop: original design composition and functional controls', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('curiosity.');
  await expect(page.locator('.hero-gallery')).toBeVisible();
  await expect(page.locator('.work-item')).toHaveCount(4);
  await page.getByRole('button', { name: 'Index' }).click();
  await expect(page.locator('.work-collection--index')).toBeVisible();
  await page.getByRole('button', { name: 'Gallery' }).click();
  await expect(page.locator('.work-collection--gallery')).toBeVisible();
  await page.locator('.expertise-trigger').nth(1).click();
  await expect(page.locator('#skill-panel-1')).toBeVisible();
  await mkdir('screenshots', { recursive: true });
  await page.screenshot({ path: 'screenshots/desktop-1440.png', fullPage: true, animations: 'disabled' });
});

test('mobile: readable navigation and no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('button', { name: 'Open menu' }).click();
  const nav = page.getByRole('navigation', { name: 'Mobile navigation' });
  await expect(nav).toBeVisible();
  await nav.getByRole('link', { name: /Work/ }).click();
  await expect(nav).not.toBeVisible();
  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  await mkdir('screenshots', { recursive: true });
  await page.screenshot({ path: 'screenshots/mobile-390.png', fullPage: true, animations: 'disabled' });
});

test('small mobile: content fits a 320px viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto('/');
  await expect(page.locator('#main')).toBeVisible();
  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
});
