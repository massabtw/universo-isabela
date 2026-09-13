import { test, expect } from '@playwright/test';
import { BIRTHDAY_DATE } from '../src/config.js';

async function visitCountdown(page) {
  await page.clock.setFixedTime(new Date(new Date(BIRTHDAY_DATE).getTime() - 60000));
  await page.goto('/');
  await expect(page.getByText('Bela.', { exact: true })).toBeVisible();
}

async function trigger(page) {
  await page.getByText('Bela.', { exact: true }).click({ clickCount: 3 });
  await expect(page.getByRole('status', { name: 'O nascimento do seu universo' })).toBeVisible();
}

async function expectUniverse(page) {
  await expect(page.locator('#inicio')).toBeAttached({ timeout: 15000 });
  await expect(page.locator('.countdown-screen')).toHaveCount(0);
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
}

for (const width of [1440, 390]) {
  test(`Big Bang completes and releases scrolling at ${width}px`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await visitCountdown(page);
    await trigger(page);
    await expect(page.getByRole('status', { name: 'O nascimento do seu universo' }).locator('canvas')).toBeVisible();
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
    await expectUniverse(page);
    expect(errors).toEqual([]);
  });
}

test('countdown expiry starts the introduction automatically', async ({ page }) => {
  await visitCountdown(page);
  await page.clock.setFixedTime(new Date(new Date(BIRTHDAY_DATE).getTime() + 100));
  await expect(page.getByRole('status', { name: 'O nascimento do seu universo' })).toBeVisible();
  await expectUniverse(page);
});

test('reduced motion reveals the universe without a particle flight', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await visitCountdown(page);
  await trigger(page);
  await expect(page.getByRole('status', { name: 'O nascimento do seu universo' }).locator('canvas')).toHaveCount(0);
  await expectUniverse(page);
});
