import { expect, test } from '@playwright/test';

test('portfolio publishes the canonical personal-domain sitemap and robots', async ({ request, page }) => {
  await page.goto('/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://samandarotabek.uz/');
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBeTruthy();
  const xml = await sitemap.text();
  expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  expect(xml).toContain('<loc>https://samandarotabek.uz/</loc>');
  expect(xml).not.toContain('alsamos.com');
  const robots = await request.get('/robots.txt');
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain('Sitemap: https://samandarotabek.uz/sitemap.xml');
});
