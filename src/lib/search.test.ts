import { describe, expect, it } from 'vitest';
import { getSearchActions } from './search';
import { FeedData } from '@/types';

describe('getSearchActions', () => {
  it('creates kbar actions from feed posts', () => {
    const posts: FeedData[] = [
      {
        title: '테스트 포스트',
        slug: 'test-post',
        description: '검색 액션 생성을 테스트합니다.',
        date: '2026-02-12',
        category: 'Frontend',
        tags: ['react', 'kbar'],
      },
    ];

    const actions = getSearchActions(posts);

    expect(actions).toHaveLength(1);
    expect(actions[0].id).toBe('test-post');
    expect(actions[0].name).toBe('테스트 포스트');
    expect(actions[0].section).toBe('블로그 포스트');
    expect(actions[0].subtitle).toBe('검색 액션 생성을 테스트합니다.');
    expect(actions[0].keywords).toContain('Frontend');
    expect(actions[0].keywords).toContain('react');
  });
});
