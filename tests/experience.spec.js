import { test, expect } from '@playwright/test';
import { PNG } from 'pngjs';

function visiblePixels(buffer) {
  const png = PNG.sync.read(buffer);
  let count = 0;
  for (let i = 0; i < png.data.length; i += 4) {
    if (png.data[i] + png.data[i + 1] + png.data[i + 2] > 110) count++;
  }
  return count;
}
async function jump(page, selector) {
  await page.locator(selector).evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(1100);
}

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 375, height: 667 }]) {
  test('complete experience at ' + viewport.width, async ({ page }, testInfo) => {
    test.setTimeout(120000);
    await page.setViewportSize(viewport);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.clock.setFixedTime(new Date('2026-09-10T18:00:00-03:00'));
    await page.goto('/');
    await expect(page.locator('.countdown-screen .side-moon')).toBeVisible();
    await expect(page.locator('.countdown-screen .side-moon')).toHaveCSS('opacity', '1', { timeout: 10000 });
    await page.screenshot({ path: testInfo.outputPath('countdown.png') });
    await page.getByRole('button', { name: /Antecipar o Big Bang/ }).click();
    await expect(page.locator('.hero-story')).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(2700);
    await expect(page.locator('#inicio h1')).toHaveCSS('opacity', '1', { timeout: 15000 });
    await expect(page.locator('#inicio .side-moon')).toHaveCSS('opacity', '1', { timeout: 15000 });
    await page.screenshot({ path: testInfo.outputPath('hero.png') });
    const initialMoon = await page.locator('#inicio .side-moon').boundingBox();
    expect(initialMoon.x + initialMoon.width / 2).toBeGreaterThan(viewport.width * 0.6);
    expect(initialMoon.y + initialMoon.height / 2).toBeLessThan(viewport.height * 0.48);
    await page.evaluate(() => window.scrollTo({ top: innerHeight * 0.5, behavior: 'instant' }));
    await page.waitForTimeout(600);
    const scene = await page.locator('.hero-scene').boundingBox();
    expect(Math.abs(scene.y)).toBeLessThan(2);
    await page.screenshot({ path: testInfo.outputPath('moon-galaxy-transition.png') });
    await jump(page, '#galaxy');
    const galaxy = page.locator('#cosmic-journey canvas');
    expect(visiblePixels(await galaxy.screenshot())).toBeGreaterThan(300);
    await page.screenshot({ path: testInfo.outputPath('galaxy.png') });
    await jump(page, '#lua');
    await expect(page.locator('.moon-observatory-inner')).toHaveCSS('opacity', '1', { timeout: 10000 });
    await expect(page.getByRole('button', { name: 'Lua de hoje', exact: true })).toHaveAttribute('aria-pressed', 'true');
    const moonSize = await page.locator('.observatory-moon').boundingBox();
    await page.getByRole('button', { name: '14 de setembro de 2007', exact: true }).click();
    await page.waitForTimeout(700);
    expect((await page.locator('.observatory-moon').boundingBox()).width).toBeCloseTo(moonSize.width, 0);
    await page.screenshot({ path: testInfo.outputPath('observatory.png') });
    await jump(page, '#sistema-solar');
    const canvas = page.locator('.orbital-stage canvas');
    await expect(canvas).toBeVisible();
    await page.waitForTimeout(1000);
    expect(visiblePixels(await canvas.screenshot())).toBeGreaterThan(300);
    const camera = await canvas.getAttribute('data-camera');
    await page.getByRole('button', { name: 'Girar para a direita', exact: true }).click();
    await page.waitForTimeout(600);
    expect(await canvas.getAttribute('data-camera')).not.toBe(camera);
    const beforeTilt = await canvas.getAttribute('data-camera');
    await page.getByRole('button', { name: 'Inclinar para cima', exact: true }).click();
    await page.waitForTimeout(600);
    expect(await canvas.getAttribute('data-camera')).not.toBe(beforeTilt);
    await page.getByRole('slider', { name: 'Zoom das órbitas' }).fill('1.6');
    await expect(page.locator('.orbit-zoom output')).toHaveText('1.6x');
    await page.getByRole('button', { name: 'Restaurar ângulo e zoom' }).click();
    await expect(page.locator('.orbit-zoom output')).toHaveText('1.0x');
    await jump(page, '#sistema-solar');
    const labelBefore = await page.locator('.orbital-label').nth(3).getAttribute('style');
    await page.waitForTimeout(350);
    expect(await page.locator('.orbital-label').nth(3).getAttribute('style')).not.toBe(labelBefore);
    const stage = await canvas.boundingBox();
    await page.mouse.move(stage.x + stage.width * 0.5, stage.y + stage.height * 0.55);
    await page.mouse.down();
    await page.mouse.move(stage.x + stage.width * 0.65, stage.y + stage.height * 0.65, { steps: 8 });
    await page.mouse.up();
    await page.waitForTimeout(500);
    expect(await canvas.getAttribute('data-camera')).not.toBe(camera);
    await page.locator('#sistema-solar').screenshot({ path: testInfo.outputPath('orbits-full.png') });
    await page.screenshot({ path: testInfo.outputPath('orbits.png') });
    await page.locator('.orbital-experience .planet-picker').getByRole('button', { name: 'Saturno', exact: true }).click();
    await expect(page.locator('.planet-model canvas')).toBeVisible({ timeout: 12000 });
    await page.waitForTimeout(1800);
    await expect(page.locator('.planet-information')).toHaveCSS('opacity', '1', { timeout: 10000 });
    await jump(page, '.planet-inspection');
    expect(visiblePixels(await page.locator('.planet-model canvas').screenshot())).toBeGreaterThan(400);
    await page.screenshot({ path: testInfo.outputPath('saturn.png') });
    await page.getByRole('button', { name: 'Voltar para as Órbitas' }).click();
    await expect(canvas).toBeVisible({ timeout: 10000 });
    await jump(page, '#calculadora-cosmica');
    await expect(page.locator('.mission-answers button')).toHaveCount(4);
    await page.locator('.mission-answers button').first().click();
    await expect(page.locator('.mission-answers button').first()).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Próximo astro' })).toBeVisible();
    await page.getByRole('button', { name: 'Próximo astro' }).click();
    await expect(page.locator('.mission-status')).toContainText('Descoberta 2');
    await page.screenshot({ path: testInfo.outputPath('missions.png') });
    await page.getByRole('button', { name: 'Sinal distante', exact: true }).click();
    await page.getByRole('button', { name: 'Iniciar transmissão' }).click();
    await page.waitForTimeout(250);
    await page.getByRole('button', { name: 'Capturar sinal' }).click();
    await expect(page.getByRole('button', { name: 'Próxima transmissão' })).toBeVisible();
    await page.getByRole('button', { name: 'Próxima transmissão' }).click();
    await expect(page.locator('.mission-status')).toContainText('Transmissão 2');
    await jump(page, '#mensagem');
    await page.screenshot({ path: testInfo.outputPath('envelope.png') });
    await page.getByRole('button', { name: 'Abrir a carta da galáxia' }).click();
    await expect(page.locator('#carta-aberta')).toBeVisible();
    await page.waitForTimeout(1500);
    await expect(page.locator('#carta-aberta')).not.toContainText('Constelação de Virgem');
    await expect(page.locator('#carta-aberta')).not.toContainText('Desejos Cósmicos');
    await expect(page.locator('#carta-aberta')).not.toContainText('14 de Setembro');
    await page.screenshot({ path: testInfo.outputPath('letter.png') });
    await page.getByRole('button', { name: 'Guardar a Carta no Envelope' }).click();
    await expect(page.getByRole('button', { name: 'Abrir a carta da galáxia' })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('reduced motion and landscape layout', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.clock.setFixedTime(new Date('2026-09-15T12:00:00Z'));
  await page.goto('/');
  await jump(page, '#calculadora-cosmica');
  await page.getByRole('button', { name: 'Sinal distante', exact: true }).click();
  await page.getByRole('slider', { name: 'Frequência' }).fill('61');
  await page.getByRole('button', { name: 'Iniciar transmissão' }).click();
  await page.getByRole('button', { name: 'Capturar sinal' }).click();
  await expect(page.locator('.mission-status')).toContainText('100 pontos');
  await page.screenshot({ path: testInfo.outputPath('landscape.png') });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
