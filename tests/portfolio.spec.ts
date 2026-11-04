import { expect, test, type Page } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

async function revealEverySection(page: Page) {
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = page.viewportSize()?.height ?? 800;
  for (let top = 0; top < height; top += Math.floor(viewportHeight * 0.65)) {
    await page.evaluate((y) => window.scrollTo(0, y), top);
    await page.waitForTimeout(115);
  }
  await page.waitForTimeout(850);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(280);
}

test('desktop: gallery, index, accordion and complete visual composition', async ({ page }) => {
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
  await revealEverySection(page);
  await mkdir('screenshots', { recursive: true });
  await page.screenshot({ path: 'screenshots/desktop-1440.png', fullPage: true, animations: 'disabled' });
});

test('mobile: responsive navigation and complete visual composition', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('button', { name: 'Open menu' }).click();
  const nav = page.getByRole('navigation', { name: 'Mobile navigation' });
  await expect(nav).toBeVisible();
  await nav.getByRole('link', { name: /Work/ }).click();
  await expect(nav).not.toBeVisible();
  const dims = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(dims.scrollWidth).toBeLessThanOrEqual(dims.clientWidth + 1);
  await revealEverySection(page);
  await mkdir('screenshots', { recursive: true });
  await page.screenshot({ path: 'screenshots/mobile-390.png', fullPage: true, animations: 'disabled' });
});

test('small mobile: 320px viewport remains within its bounds', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto('/');
  await expect(page.locator('#main')).toBeVisible();
  const dims = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(dims.scrollWidth).toBeLessThanOrEqual(dims.clientWidth + 1);
});
