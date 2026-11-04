import { expect, test, type Page } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

async function revealEverySection(page: Page) {
  await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = page.viewportSize()?.height ?? 800;
  for (let top = 0; top < height; top += Math.floor(viewportHeight * 0.87)) {
    await page.evaluate((y) => window.scrollTo(0, y), top);
    await page.waitForTimeout(75);
  }
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(180);
}

test('desktop: gallery, index, accordion and complete visual composition', async ({ page }) => {
  test.setTimeout(120_000);
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
  await page.screenshot({ path: 'screenshots/desktop-1440.png', fullPage: true, animations: 'disabled', timeout: 90_000 });
});

test('mobile: responsive navigation and complete visual composition', async ({ page }) => {
  test.setTimeout(120_000);
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

test('CV download is a valid publicly served searchable PDF', async ({ page, request }) => {
  await page.goto('/');
  const downloadLink = page.getByRole('link', { name: /Download CV/i }).first();
  await expect(downloadLink).toHaveAttribute('href', '/cv/Samandar_Alimov_CV.pdf');
  const pdf = await request.get('/cv/Samandar_Alimov_CV.pdf');
  expect(pdf.status()).toBe(200);
  const bytes = await pdf.body();
  expect(bytes.subarray(0, 5).toString()).toBe('%PDF-');
  expect(bytes.length).toBeGreaterThan(3000);
  await expect(page.getByRole('heading', { name: /Beyond the/i })).toBeVisible();
});
