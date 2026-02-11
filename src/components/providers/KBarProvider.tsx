'use client';

import { KBarProvider as KBarProviderLib } from 'kbar';
import { CommandPalette } from '@/components/common/CommandPalette';
import { getSearchActions } from '@/lib/search';

interface KBarProviderProps {
  children: React.ReactNode;
}

export default function KBarProvider({ children }: KBarProviderProps) {
  // Start with basic navigation actions
  // Posts will be added dynamically when available
  const initialActions = getSearchActions([]);

  return (
    <KBarProviderLib actions={initialActions}>
      {children}
      <CommandPalette />
    </KBarProviderLib>
  );
}
