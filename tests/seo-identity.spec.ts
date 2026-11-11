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
  expect(person?.sameAs).toEqual(expect.arrayContaining(['https://github.com/SamandarAlimov', 'https://www.linkedin.com/in/samandarotabek/', 'https://www.youtube.com/@SamandarOtabek', 'https://t.me/SamandarOtabek', 'https://t.me/Samandar_Otabek', 'https://www.instagram.com/SamandarOtabek/', 'https://www.facebook.com/SamandarOtabek', 'https://twitter.com/SamandarOtabek']));
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

test('Uzbek identity page has unique canonical, hreflang and truthful links', async ({request}) => {
  const response = await request.get('/haqimda.html');
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain('<html lang="uz">');
  expect(html).toContain('Samandar Alimov');
  expect(html).toContain('Samandar Otabek');
  expect(html).toContain('Самандар Алимов');
  expect(html).toContain('Alsamos');
  expect(html).toContain('SAMOS');
  expect(html).toContain('https://samandarotabek.uz/haqimda.html');
  expect(html).toContain('https://github.com/SamandarAlimov');
  expect(html).toContain('https://www.linkedin.com/in/samandarotabek/');
  const site = await request.get('/sitemap.xml');
  expect(await site.text()).toContain('<loc>https://samandarotabek.uz/haqimda.html</loc>');
  const english = await request.get('/about.html');
  expect(await english.text()).toContain('hreflang="uz"');
});

test('service pages are real static pages with reciprocal canonical, headings, provenance, and sitemap entries', async ({request}) => {
  for (const [path, language, other] of [
    ['/xizmatlar.html','uz','/services.html'],
    ['/services.html','en','/xizmatlar.html']
  ]) {
    const r = await request.get(path);
    expect(r.status()).toBe(200);
    const html = await r.text();
    expect(html).toContain('<html lang="' + language + '">');
    expect(html).toContain('rel="canonical" href="https://samandarotabek.uz' + path + '"');
    expect(html).toContain('href="https://samandarotabek.uz' + other + '"');
    expect(html).toContain('https://github.com/SamandarAlimov/alsamos');
    expect(html).toContain('https://leo-logistics.uz/');
    expect(html).toContain('mailto:samandaralimov18@gmail.com?subject=');
    expect((html.match(/class="card" id="/g) || []).length).toBe(7);
    const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    const ld = JSON.parse(scripts[0][1]);
    expect(ld['@graph'].filter((x: { '@type': string }) => x['@type'] === 'Service')).toHaveLength(7);
  }
  const sitemap = await request.get('/sitemap.xml');
  const xml = await sitemap.text();
  expect(xml).toContain('<loc>https://samandarotabek.uz/xizmatlar.html</loc>');
  expect(xml).toContain('<loc>https://samandarotabek.uz/services.html</loc>');
});

test('owner-supplied social links are present across home and both static profile languages', async ({request,page}) => {
  const socials = ["https://www.youtube.com/@SamandarOtabek","https://t.me/SamandarOtabek","https://t.me/Samandar_Otabek","https://www.instagram.com/SamandarOtabek/","https://www.facebook.com/SamandarOtabek","https://twitter.com/SamandarOtabek"];
  for (const route of ['/', '/about.html', '/haqimda.html']) {
    const response = await request.get(route);
    expect(response.status()).toBe(200);
    const html = await response.text();
    const [m] = Array.from(html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g));
    expect(m).toBeDefined();
    const graph = JSON.parse(m[1])['@graph'];
    const person = graph.find((entry: { '@type': string }) => entry['@type'] === 'Person');
    for(const url of socials) expect(person.sameAs).toContain(url);
  }
  for (const route of ['/about.html','/haqimda.html']) {
    const html = await (await request.get(route)).text();
    for(const url of socials) expect(html).toContain('href="' + url + '"');
  }
  await page.goto('/');
  await expect(page.locator('footer').getByRole('link',{name:/YouTube/})).toHaveAttribute('href','https://www.youtube.com/@SamandarOtabek');
  await expect(page.locator('footer').getByRole('link',{name:'Telegram (personal)',exact:true})).toHaveAttribute('href','https://t.me/SamandarOtabek');
});

test('Telegram channel and personal account are distinct and visibly labelled', async ({page, request}) => {
  const personal = 'https://t.me/SamandarOtabek';
  const channel = 'https://t.me/Samandar_Otabek';
  await page.goto('/');
  const footer = page.locator('footer');
  await expect(footer.getByRole('link', {name: 'Telegram (personal)'})).toHaveAttribute('href', personal);
  await expect(footer.getByRole('link', {name: 'Telegram channel'})).toHaveAttribute('href', channel);
  for(const profile of ['/about.html', '/haqimda.html']){
    const html = await (await request.get(profile)).text();
    expect(html).toContain('href="' + personal + '"');
    expect(html).toContain('href="' + channel + '"');
  }
});

test('updated personal biography reflects TMC 2026 graduation and all founder/CEO roles', async ({request,page}) => {
  for (const route of ['/about.html','/haqimda.html']) {
    const response = await request.get(route);
    expect(response.status()).toBe(200);
    const html = await response.text();
    for (const name of ['Alsamos','SAMOS','ATEAM',"Alimov's"]) expect(html).toContain(name);
    expect(html).toContain('2026');
  }
  const home = await request.get('/');
  const h = await home.text();
  expect(h).toContain('Founder and CEO of Alsamos, SAMOS, ATEAM and Alimov');
  await page.goto('/');
  await expect(page.locator('#about')).toContainText('I graduated from TMC Institute in 2026');
});
