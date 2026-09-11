import { test, expect } from '@playwright/test';
import { PNG } from 'pngjs';

test('all planet textures and lunar satellite render', async ({ page }, testInfo) => {
  test.setTimeout(120000);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.clock.setFixedTime(new Date('2026-09-15T12:00:00Z'));
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.locator('#sistema-solar').scrollIntoViewIfNeeded();
  await page.locator('.orbital-experience .planet-picker').getByRole('button', { name: 'O Sol', exact: true }).click();
  for (const name of ['O Sol', 'Mercúrio', 'Vênus', 'Terra', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Netuno']) {
    await page.locator('.planet-navigation .planet-picker').getByRole('button', { name, exact: true }).click();
    await expect(page.locator('.globe-loading')).toHaveCount(0, { timeout: 10000 });
    await expect(page.locator('.globe-fallback')).toHaveCount(0);
    await expect(page.locator('.planet-information')).toHaveCSS('opacity', '1');
    const png = PNG.sync.read(await page.locator('.globe-canvas canvas').screenshot());
    const colors = new Set();
    for (let i = 0; i < png.data.length; i += 16) {
      if (png.data[i] + png.data[i + 1] + png.data[i + 2] > 120) colors.add(png.data.slice(i, i + 3).toString('hex'));
    }
    expect(colors.size, name + ' has texture detail').toBeGreaterThan(30);
  }
  await page.locator('.planet-navigation .planet-picker').getByRole('button', { name: 'Terra', exact: true }).click();
  await page.getByRole('button', { name: 'A Lua', exact: true }).click();
  await expect(page.locator('.planet-information h3')).toHaveText('A Lua');
  await expect(page.locator('.globe-loading')).toHaveCount(0);
  await page.locator('.planet-inspection').screenshot({ path: testInfo.outputPath('lunar-satellite.png') });
  expect(errors).toEqual([]);
});

test('phone touch rotation, pinch zoom, reset and keyboard', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.clock.setFixedTime(new Date('2026-09-15T12:00:00Z'));
  await page.goto('/');
  await page.getByRole('button', { name: 'Abrir menu de navegação' }).tap();
  const menu = page.getByRole('dialog', { name: 'Navegação cósmica' });
  await expect(menu).toBeVisible();
  await expect(menu.getByRole('button', { name: 'Fechar navegação' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(menu.getByRole('link').last()).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menu).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Abrir menu de navegação' })).toBeFocused();
  await page.locator('.orbital-stage').scrollIntoViewIfNeeded();
  const canvas = page.locator('.orbital-stage canvas');
  await expect(canvas).toBeVisible();
  await page.waitForTimeout(500);
  const bounds = await canvas.boundingBox();
  const center = { x: Math.round(bounds.x + bounds.width / 2), y: Math.round(bounds.y + bounds.height / 2) };
  const cdp = await context.newCDPSession(page);
  const initial = await canvas.getAttribute('data-camera');
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ ...center, id: 1 }] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: center.x + 60, y: center.y + 35, id: 1 }] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await page.waitForTimeout(600);
  expect(await canvas.getAttribute('data-camera')).not.toBe(initial);
  const points = distance => [{ x: center.x - distance, y: center.y, id: 1 }, { x: center.x + distance, y: center.y, id: 2 }];
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: points(30) });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: points(60) });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await page.waitForTimeout(600);
  expect(Number(await page.getByRole('slider', { name: 'Zoom das órbitas' }).inputValue())).toBeGreaterThan(1.2);
  await page.getByRole('button', { name: 'Restaurar ângulo e zoom' }).tap();
  await expect(page.locator('.orbit-zoom output')).toHaveText('1.0x');
  const beforeKey = await canvas.getAttribute('data-camera');
  await page.locator('.orbital-stage').focus();
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(600);
  expect(await canvas.getAttribute('data-camera')).not.toBe(beforeKey);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});
