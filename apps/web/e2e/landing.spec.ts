import { test, expect } from '@playwright/test';

test.describe('terminal output', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('UI validation', () => {
    test('terminal output section', async ({ page }) => {
      await expect(page.locator('.terminal-output')).toBeVisible();
    });

    test('terminal input', async ({ page }) => {
      await expect(page.locator('.terminal-prompt')).toBeVisible({ timeout: 10_000});
    });

    test('command-hints', async({ page }) => {
      await expect(page.locator('.command-hints')).toBeVisible({ timeout: 10_000});

      await expect(page.getByRole('button', { name: 'help'} )).toBeVisible();
      await expect(page.getByRole('button', { name: 'help'} )).toHaveText('help');

      await expect(page.getByRole('button', { name: 'status'} )).toBeVisible();
      await expect(page.getByRole('button', { name: 'status'} )).toHaveText('status');

      await expect(page.getByRole('button', { name: 'initialize'} )).toBeVisible();
      await expect(page.getByRole('button', { name: 'initialize'} )).toHaveText('initialize');

      await expect(page.getByRole('button', { name: 'explore'} )).toBeVisible();
      await expect(page.getByRole('button', { name: 'explore'} )).toHaveText('explore');
    })
  });

  test.describe('UI interactions', () => {
    test('select help', async ({ page }) => {
      await page.getByRole('button', { name: 'help' }).click();

      await expect(page.locator('.terminal-session')).toBeVisible();
    });

    test('select status', async ({ page }) => {
      await page.getByRole('button', { name: 'status' }).click();

      await expect(page.locator('.terminal-session')).toBeVisible();
    });

    test('select initialize', async ({ page }) => {
      await page.getByRole('button', { name: 'initialize' }).click();

      await expect(page.locator('.terminal-session')).not.toBeVisible();
    });

    test('select explore', async ({ page }) => {
      await page.getByRole('button', { name: 'explore' }).click();

      await expect(page.locator('.site-shell')).toBeVisible();
    });
  });
});