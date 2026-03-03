import { expect, test } from '@playwright/test';

const VISUALIZATION_POST_PATH = '/blog/algorithm-visualization';

test.describe('Mobile TOC sheet', () => {
  test('모바일 목차를 열고 항목 이동 시 해시가 업데이트된다', async ({
    page,
  }) => {
    await page.goto(VISUALIZATION_POST_PATH);
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '목차 열기' }).click();

    const dialog = page.getByRole('dialog', { name: '목차' });
    await expect(dialog).toBeVisible();

    const headingButton = dialog.locator('ul button').first();
    await headingButton.click();

    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(/#.+/);
  });

  test('Esc 키로 목차 시트를 닫을 수 있다', async ({ page }) => {
    await page.goto(VISUALIZATION_POST_PATH);
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: '목차 열기' }).click();

    const dialog = page.getByRole('dialog', { name: '목차' });
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
  });
});
