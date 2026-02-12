import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import JsonLd from './JsonLd';

describe('JsonLd', () => {
  it('renders schema payload as JSON script content', () => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'eunu.log',
    };

    const { container } = render(<JsonLd data={data} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script).not.toBeNull();
    expect(script?.innerHTML).toContain('"@type":"WebSite"');
    expect(script?.innerHTML).toContain('"name":"eunu.log"');
  });
});
