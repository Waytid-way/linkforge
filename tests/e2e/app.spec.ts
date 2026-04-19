import { test, expect } from '@playwright/test';

test.describe('LinkForge E2E', () => {
  test('landing page redirects to login', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/login/);
  });

  test('login page renders correctly', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible();
    await expect(page.getByPlaceholder('you@example.com')).toBeVisible();
  });

  test('signup page renders correctly', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.getByRole('heading', { name: /create account/i })).toBeVisible();
    await expect(page.getByPlaceholder('yourname')).toBeVisible();
  });

  test('signup form validates input', async ({ page }) => {
    await page.goto('/signup');
    
    await page.getByPlaceholder('yourname').fill('testuser');
    await page.getByPlaceholder('you@example.com').fill('test@example.com');
    await page.getByPlaceholder('••••••••').fill('password123');
    
    await expect(page.getByRole('button', { name: /create account/i })).toBeEnabled();
  });

  test('profile page shows 404 for unknown user', async ({ page }) => {
    await page.goto('/unknownuser12345');
    await expect(page.getByText(/not found/i)).toBeVisible({ timeout: 10000 });
  });
});