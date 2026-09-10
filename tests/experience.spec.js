import { test, expect } from '@playwright/test';

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  test(`scroll scene and letter opening at ${viewport.width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize(viewport);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.clock.setFixedTime(new Date('2026-09-10T18:00:00-03:00'));
    await page.goto('/');
    await page.getByRole('button', { name: /Simular/ }).click();
    await expect(page.locator('.hero-story')).toBeVisible({ timeout: 12000 });
    await page.waitForTimeout(3300);
    await expect(page.locator('html')).toHaveClass(/lenis/);
    await page.screenshot({ path: testInfo.outputPath('hero-start.png') });
    const initial = await page.locator('.hero-copy').evaluate(el => getComputedStyle(el).transform);
    await page.mouse.move(viewport.width / 2, viewport.height / 2);
    await page.mouse.wheel(0, 330);
    await page.waitForTimeout(900);
    const halfway = await page.locator('.hero-copy').evaluate(el => getComputedStyle(el).transform);
    expect(halfway).not.toBe(initial);
    const scene = await page.locator('.hero-scene').boundingBox();
    expect(Math.abs(scene.y)).toBeLessThan(2);
    await page.screenshot({ path: testInfo.outputPath('hero-scroll.png') });
    const envelope = page.getByRole('button', { name: 'Abrir a carta da galáxia' });
    await envelope.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: testInfo.outputPath('envelope-closed.png') });
    await envelope.click();
    await page.waitForTimeout(1400);
    await expect(page.locator('#carta-aberta')).toBeVisible({ timeout: 7000 });
    await page.locator('#carta-aberta h3').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page.locator('#carta-aberta h3')).toBeInViewport();
    await page.screenshot({ path: testInfo.outputPath('letter-open.png') });
    await page.getByRole('button', { name: /Guardar a Carta/ }).click();
    await expect(envelope).toBeVisible({ timeout: 5000 });
    await envelope.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#carta-aberta')).toBeVisible({ timeout: 7000 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}
