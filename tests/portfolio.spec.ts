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
  await expect(page.getByRole('heading', { name: 'Proactive Marketing' })).toHaveCount(1);
  await expect(page.getByRole('heading', { name: 'Samhus' })).toHaveCount(0);
  await expect(page.locator('.resume-paper-tags')).toContainText('Proactive');
  await expect(page.locator('.resume-paper-tags')).not.toContainText('Samhus');
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
  const pdfData = bytes.toString('latin1');
  expect(pdfData).toContain('Proactive Marketing');
  expect(pdfData).toContain('Jizzakh City School');
  expect(pdfData).toContain('EHM Gymnasium');
  expect(pdfData).toContain('Hyundai C.E.');
  expect(pdfData).toContain('Loftmee');
  expect(pdfData).toContain('/Count 2');
  expect(pdfData).not.toContain('Samhus');
  await expect(page.getByRole('heading', { name: /Beyond the/i })).toBeVisible();
});

test('updated real portrait appears on site and is embedded in the CV', async ({ page, request }) => {
  await page.goto('/');
  const portrait = page.getByRole('img', { name: /centered professional portrait/i });
  await expect(portrait).toHaveAttribute('src', /samandar-portrait[.]webp$/);
  const photo = await request.get('/images/samandar-portrait.webp');
  expect(photo.status()).toBe(200);
  const imageBytes = await photo.body();
  expect(imageBytes.subarray(0, 4).toString('ascii')).toBe('RIFF');
  expect(imageBytes.subarray(8, 12).toString('ascii')).toBe('WEBP');
  const pdf = await request.get('/cv/Samandar_Alimov_CV.pdf');
  const pdfBody = (await pdf.body()).toString('latin1');
  expect(pdf.status()).toBe(200);
  expect(pdfBody).toContain('/Subtype /Image');
  expect(pdfBody).toContain('/Portrait');
  expect(pdfBody).toContain('SAMANDAR ALIMOV');
});

test('hero showcases verifiable work instead of decorative 3D', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const region = page.getByRole('region', { name: 'Featured portfolio projects' });
  await expect(region).toBeVisible();
  await expect(region.getByRole('heading', { name: 'Leo Logistics Academy' })).toBeVisible();
  await expect(region).toContainText('PUBLIC WEBSITE');
  await expect(region.getByRole('link', { name: /Visit website/i })).toHaveAttribute('href', 'https://leo-logistics.uz');
  await region.getByRole('button', { name: 'Show project: Proactive Marketing' }).click();
  await expect(region.getByRole('heading', { name: 'Proactive Marketing' })).toBeVisible();
  await expect(region).toContainText('WORK IN PROGRESS');
  await expect(region.getByRole('link', { name: /Explore project/i })).toHaveAttribute('href', 'https://proactive.agency.uz');
  await region.getByRole('button', { name: 'Next featured project' }).click();
  await expect(region.getByRole('heading', { name: 'Alsamos' })).toBeVisible();
  await expect(region.locator('canvas')).toHaveCount(0);
  const size = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(size.scrollWidth).toBeLessThanOrEqual(size.clientWidth + 1);
});

test('collaborative work is complete, clear and not presented as sole work', async ({ page }) => {
  await page.goto('/');
  const section = page.getByRole('heading', { name: /More than/i });
  await expect(section).toBeVisible();
  await expect(page.locator('.collaboration-card')).toHaveCount(10);
  await expect(page.locator('.collaborations')).toContainText('TEAM COLLABORATION');
  await expect(page.locator('.collaborations')).toContainText('Hyundai C.E.');
  await expect(page.locator('.collaborations')).toContainText('Loftmee');
  await expect(page.locator('.collaborations')).not.toContainText('Englify');
});
