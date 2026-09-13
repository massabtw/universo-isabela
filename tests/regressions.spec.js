import { test, expect } from '@playwright/test';
import { PNG } from 'pngjs';

async function visit(page, beforeBirthday = false) {
  await page.clock.setFixedTime(new Date(beforeBirthday ? '2026-09-10T12:00:00Z' : '2026-09-15T12:00:00Z'));
  await page.goto('/');
}

async function scrollTo(page, selector) {
  await page.locator(selector).evaluate(el => {
    if (window.lenisInstance) window.lenisInstance.scrollTo(el, { immediate: true, offset: -90, force: true });
    else el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
}

test('desktop Big Bang draws moving stars and can be replayed', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await visit(page, true);
  await page.getByRole('button', { name: 'Antecipar o Big Bang', exact: true }).click();
  await page.waitForTimeout(850);
  const canvas = page.locator('.countdown-screen canvas');
  const first = await canvas.screenshot();
  await page.waitForTimeout(200);
  const second = await canvas.screenshot();
  expect(first.equals(second)).toBe(false);
  const png = PNG.sync.read(second);
  let bright = 0;
  for (let i = 0; i < png.data.length; i += 4) if (png.data[i] > 140) bright++;
  expect(bright).toBeGreaterThan(300);
  await page.screenshot({ path: testInfo.outputPath('big-bang.png') });
  await expect(page.locator('#inicio')).toBeVisible({ timeout: 15000 });
  await page.getByRole('button', { name: /Retornar à Tela de Espera/ }).click();
  const secret = page.getByRole('button', { name: /Bela: antecipar aniversário/ });
  await secret.click({ clickCount: 3 });
  await expect(page.locator('#inicio')).toBeVisible({ timeout: 15000 });
  expect(errors).toEqual([]);
});

test('desktop astronaut leaves the ground, lands and resets when changing planet', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await visit(page);
  await scrollTo(page, '#calculadora-cosmica');
  await page.getByRole('button', { name: 'Simulador de Gravidade' }).click();
  const astronaut = page.getByTestId('jump-astronaut');
  await astronaut.scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Testar Salto da Bela' }).click();
  await expect.poll(() => astronaut.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m42)).toBeLessThan(-15);
  await page.screenshot({ path: testInfo.outputPath('jump.png') });
  await expect(page.getByRole('button', { name: 'Testar Salto da Bela' })).toBeEnabled();
  await expect.poll(() => astronaut.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m42)).toBe(0);
  await page.getByRole('button', { name: 'Testar Salto da Bela' }).click();
  await page.locator('#calculadora-cosmica').getByRole('button', { name: 'A Lua', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Testar Salto da Bela' })).toBeEnabled();
  await expect.poll(() => astronaut.evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m42)).toBe(0);
  expect(errors).toEqual([]);
});

test('reduced motion keeps the Big Bang, letter and gallery usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await visit(page, true);
  await page.getByRole('button', { name: 'Antecipar o Big Bang', exact: true }).click();
  await expect(page.locator('#inicio')).toBeVisible({ timeout: 15000 });
  await scrollTo(page, '#mensagem');
  await page.getByRole('button', { name: 'Abrir a carta da galáxia' }).click();
  await expect(page.locator('#carta-aberta')).toBeFocused();
  await page.getByRole('button', { name: 'Guardar a Carta no Envelope' }).click();
  await scrollTo(page, '#galeria');
  await page.locator('#galeria .photo-card').first().click();
  await expect(page.getByRole('button', { name: 'Fechar foto' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Foto anterior' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 320, height: 568 }, { width: 844, height: 390 }]) {
  test.describe('responsive fixes ' + viewport.width, () => {
    test.use({ viewport, isMobile: viewport.width < 900, hasTouch: viewport.width < 900 });
    test('moons, constellation, letter and both photo galleries', async ({ page, browserName }, testInfo) => {
      test.setTimeout(90000);
      const errors = [];
      const requests = [];
      const activate = locator => viewport.width < 900 ? locator.tap() : locator.click();
      page.on('pageerror', error => errors.push(error.message));
      page.on('request', request => requests.push(request.url()));
      await visit(page);
      const heroMoon = page.locator('#inicio .side-moon img');
      await expect.poll(() => heroMoon.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
      await scrollTo(page, '#lua');
      await expect(page.locator('.moon-observatory-inner')).toHaveCSS('opacity', '1');
      const moon = page.locator('.observatory-moon');
      const before = await moon.screenshot();
      await page.getByRole('button', { name: '14 de setembro de 2007', exact: true }).click();
      const after = await moon.screenshot();
      expect(before.equals(after)).toBe(false);
      await page.getByRole('button', { name: 'Lua de hoje', exact: true }).click();
      expect(requests.some(url => url.endsWith('/moon_full.jpg'))).toBe(false);
      expect(requests.some(url => url.endsWith('/musica.mp3'))).toBe(false);
      await scrollTo(page, '#constelacao');
      const lines = page.locator('.constellation-line');
      await expect(lines).toHaveCount(10);
      for (const line of await lines.all()) {
        await expect(line).toBeVisible();
        await expect(line).toHaveCSS('opacity', '1');
        await expect(line).toHaveAttribute('vector-effect', 'non-scaling-stroke');
      }
      await page.locator('#constelacao svg').first().screenshot({ path: testInfo.outputPath('constellation.png') });
      await scrollTo(page, '#mensagem');
      const envelope = page.getByRole('button', { name: 'Abrir a carta da galáxia' });
      const bounds = await envelope.boundingBox();
      expect(bounds.x).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(viewport.width);
      await page.screenshot({ path: testInfo.outputPath('envelope.png') });
      await activate(envelope);
      await page.waitForTimeout(400);
      await page.screenshot({ path: testInfo.outputPath('envelope-opening.png') });
      const letter = page.locator('#carta-aberta');
      await expect(letter).toBeVisible();
      await expect(letter).toBeFocused();
      expect((await letter.boundingBox()).y).toBeGreaterThanOrEqual(0);
      await page.screenshot({ path: testInfo.outputPath('letter.png') });
      await page.getByRole('button', { name: 'Guardar a Carta no Envelope' }).click();
      await expect(envelope).toBeFocused();

      for (const section of ['#galeria', '#mais-linda']) {
        await scrollTo(page, section);
        const card = page.locator(section + ' .photo-card').first();
        await card.scrollIntoViewIfNeeded();
        await expect(card).toHaveCSS('opacity', '1');
        if (viewport.width > 900) {
          const original = await card.boundingBox();
          await page.mouse.move(original.x + 2, original.y + 2);
          await page.waitForTimeout(800);
          const hovered = await card.boundingBox();
          expect(Math.abs(hovered.y - original.y)).toBeLessThan(1);
          expect(Math.abs(hovered.height - original.height)).toBeLessThan(1);
        }
        await activate(card);
        const dialog = page.getByRole('dialog');
        await expect(dialog).toBeVisible();
        await expect(page.getByRole('button', { name: 'Fechar foto' })).toBeFocused();
        const photo = dialog.locator('img');
        await expect.poll(() => photo.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
        const rect = await photo.boundingBox();
        expect(rect.x).toBeGreaterThanOrEqual(0);
        expect(rect.x + rect.width).toBeLessThanOrEqual(viewport.width);
        expect(rect.y + rect.height).toBeLessThanOrEqual(viewport.height);
        const src = await photo.getAttribute('src');
        await activate(page.getByRole('button', { name: 'Próxima foto' }));
        await expect(photo).not.toHaveAttribute('src', src);
        await activate(page.getByRole('button', { name: 'Foto anterior' }));
        await expect(photo).toHaveAttribute('src', src);
        await page.screenshot({ path: testInfo.outputPath(section.slice(1) + '-lightbox.png') });
        const scroll = await page.evaluate(() => scrollY);
        if (viewport.width < 900 && browserName === 'chromium') {
          const cdp = await page.context().newCDPSession(page);
          await cdp.send('Input.synthesizeScrollGesture', {
            x: Math.round(viewport.width / 2), y: Math.round(viewport.height / 2),
            yDistance: -100, speed: 400, gestureSourceType: 'touch', preventFling: true,
          });
        } else if (viewport.width > 900) await page.mouse.wheel(0, 400);
        await expect(page.locator('html')).toHaveCSS('overflow', 'hidden');
        await page.waitForTimeout(150);
        expect(await page.evaluate(() => scrollY)).toBe(scroll);
        if (viewport.width < 900) await activate(page.getByRole('button', { name: 'Fechar foto' }));
        else await page.keyboard.press('Escape');
        await expect(dialog).toHaveCount(0);
        await expect(card).toBeFocused();
      }
      await expect(page.locator('#mais-linda h2')).not.toContainText('“');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect(errors).toEqual([]);
    });
  });
}
