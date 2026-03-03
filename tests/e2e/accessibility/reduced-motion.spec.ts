import { expect, test } from '@playwright/test';

const VISUALIZATION_POST_PATH = '/blog/algorithm-visualization';

test.describe('Reduced motion preference', () => {
  test('prefers-reduced-motion 환경에서 축소 모션 상태를 반영한다', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(VISUALIZATION_POST_PATH);
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('모션 축소').first()).toBeVisible();
  });

  test('모션 모드를 꺼짐으로 전환하면 3D 캔버스를 대체 안내로 전환한다', async ({
    page,
  }) => {
    await page.goto(VISUALIZATION_POST_PATH);
    await page.waitForLoadState('networkidle');

    const motionButton = page
      .getByRole('button', { name: /모션 모드/ })
      .first();

    await motionButton.click(); // auto -> reduced
    await motionButton.click(); // reduced -> off

    await expect(page.getByText('3D 뷰가 꺼져 있습니다').first()).toBeVisible();
  });
});
