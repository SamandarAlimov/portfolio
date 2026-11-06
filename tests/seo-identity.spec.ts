import { expect, test } from '@playwright/test';

test('personal identity has stable canonical SEO and linked people entities', async ({ page, request }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Samandar Otabek.*Samandar Alimov/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://samandarotabek.uz/');
  const homepage = await request.get('/');
  expect(homepage.ok()).toBeTruthy();
  const html = await homepage.text();
  const [script] = Array.from(html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g));
  expect(script).toBeDefined();
  const payload = JSON.parse(script[1]) as { '@graph': Array<Record<string, unknown>> };
  const person = payload['@graph'].find(entry => entry['@type'] === 'Person');
  expect(person?.name).toBe('Samandar Otabek');
  expect(person?.alternateName).toEqual(expect.arrayContaining(['Samandar Alimov', 'Samandar']));
  expect(person?.sameAs).toEqual(expect.arrayContaining(['https://github.com/SamandarAlimov', 'https://www.linkedin.com/in/samandarotabek/']));
  expect(html).not.toContain('sameAs": ["https://instagram.com/unknown');
  await expect(page.getByRole('link', {name: /Read my full profile/})).toHaveAttribute('href', '/about.html');
});

test('static profile is crawlable without React and links to real professional identities', async ({ request }) => {
  const response = await request.get('/about.html');
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain('Samandar Alimov');
  expect(body).toContain('Samandar Otabek');
  expect(body).toContain('SAMOS');
  expect(body).toContain('https://www.alsamos.com/');
  expect(body).toContain('https://www.linkedin.com/in/samandarotabek/');
  expect(body).toContain('https://github.com/SamandarAlimov');
  expect(body).toContain('<main id="content">');
  expect(body).toContain('https://samandarotabek.uz/about.html');
  expect(body).not.toContain('Samhus');
});

test('sitemap and robots contain only published canonical personal pages', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.status()).toBe(200);
  const xml = await response.text();
  expect(xml).toContain('<loc>https://samandarotabek.uz/</loc>');
  expect(xml).toContain('<loc>https://samandarotabek.uz/about.html</loc>');
  expect(xml).not.toContain('alsamos.com');
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('Sitemap: https://samandarotabek.uz/sitemap.xml');
});
