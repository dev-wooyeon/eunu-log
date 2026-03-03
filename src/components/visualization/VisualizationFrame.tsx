'use client';

import type { ReactNode } from 'react';
import type {
  EffectiveMotionMode,
  MotionMode,
} from '@/shared/motion/model/motion-mode';

export interface VisualizationFrameProps {
  title: string;
  controlsHint: string;
  motionMode: MotionMode | EffectiveMotionMode;
  statusText?: string;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  children: ReactNode;
}

const modeLabel: Record<MotionMode | EffectiveMotionMode, string> = {
  auto: '자동',
  full: '자동(전체)',
  reduced: '축소',
  off: '끔',
};

export default function VisualizationFrame({
  title,
  controlsHint,
  motionMode,
  statusText,
  isPlaying,
  onTogglePlay,
  children,
}: VisualizationFrameProps) {
  return (
    <div className="w-full space-y-4">
      <div className="rounded-xl border border-[var(--color-grey-200)] bg-[var(--color-grey-50)] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-[var(--color-grey-900)]">
            {title}
          </h3>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-[var(--color-grey-300)] bg-[var(--color-bg-primary)] px-2.5 py-1 text-xs font-medium text-[var(--color-grey-700)]">
              모션 {modeLabel[motionMode] ?? modeLabel.auto}
            </span>
            {onTogglePlay && (
              <button
                type="button"
                onClick={onTogglePlay}
                className="rounded-lg border border-[var(--color-grey-300)] bg-[var(--color-bg-primary)] px-3 py-1.5 text-xs font-semibold text-[var(--color-grey-800)] hover:bg-[var(--color-grey-100)]"
              >
                {isPlaying ? '일시정지' : '재생'}
              </button>
            )}
          </div>
        </div>

        <p className="mt-2 text-sm text-[var(--color-grey-600)]">
          {controlsHint}
        </p>
        {statusText && (
          <p className="mt-2 text-xs font-medium text-[var(--color-toss-blue)]">
            현재 상태: {statusText}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}

interface VisualizationFallbackProps {
  title: string;
  description: string;
}

export function VisualizationFallback({
  title,
  description,
}: VisualizationFallbackProps) {
  return (
    <div className="rounded-xl border border-[var(--color-grey-200)] bg-[var(--color-bg-primary)] p-6">
      <h4 className="text-sm font-semibold text-[var(--color-grey-900)]">
        {title}
      </h4>
      <p className="mt-2 text-sm text-[var(--color-grey-600)]">{description}</p>
    </div>
  );
}
