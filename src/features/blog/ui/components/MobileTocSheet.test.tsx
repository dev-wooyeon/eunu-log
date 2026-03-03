import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MobileTocSheet from './MobileTocSheet';

const mockTrackEvent = vi.fn();

vi.mock('@/shared/analytics/lib/analytics', () => ({
  AnalyticsEvents: {
    tocOpened: 'toc_opened',
  },
  trackEvent: (...args: unknown[]) => mockTrackEvent(...args),
}));

describe('MobileTocSheet', () => {
  it('opens dialog and navigates to heading', () => {
    const onNavigate = vi.fn();

    render(
      <MobileTocSheet
        items={[{ id: 'sec-1', text: '섹션 1', level: 2 }]}
        activeId="sec-1"
        postSlug="sample"
        onNavigate={onNavigate}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: '목차 열기' }));

    expect(screen.getByRole('dialog', { name: '목차' })).toBeInTheDocument();
    expect(mockTrackEvent).toHaveBeenCalledWith('toc_opened', {
      surface: 'mobile_toc_sheet',
      active_heading: 'sec-1',
      post_slug: 'sample',
    });

    fireEvent.click(screen.getByRole('button', { name: '섹션 1' }));
    expect(onNavigate).toHaveBeenCalledWith('sec-1');
  });
});
