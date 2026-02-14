import type { ExperienceStage, ExperienceStageKey } from '@/data/resume';

const STAGE_ORDER: Record<ExperienceStageKey, number> = {
  problem: 0,
  decision: 1,
  implementation: 2,
  verification: 3,
  result: 4,
  extension: 5,
};

export function orderExperienceStages(
  stages: ExperienceStage[]
): ExperienceStage[] {
  return [...stages].sort((left, right) => {
    return STAGE_ORDER[left.key] - STAGE_ORDER[right.key];
  });
}
