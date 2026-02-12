import { Metadata } from 'next';
import Link from 'next/link';
import { Header, Container } from '@/components/layout';
import {
  experiences,
  personalInfo,
  personalProjects,
  education,
  activities,
  certifications,
} from '@/data/resume';

export const metadata: Metadata = {
  title: 'Resume',
  description: `${personalInfo.name}의 이력서`,
};

type ResumeTrack = 'backend' | 'data';

interface ResumeVariant {
  label: string;
  position: string;
  introduction: string;
  skills: string[];
  focusAreas: string[];
}

interface ProjectOverride {
  description?: string;
  achievements?: string[];
}

interface ProjectVisibility {
  experience: string[];
  personal: string[];
}

const resumeVariants: Record<ResumeTrack, ResumeVariant> = {
  backend: {
    label: '백엔드 엔지니어',
    position: 'Backend Engineer',
    introduction:
      '분산 시스템과 도메인 중심 설계를 바탕으로 안정적이고 확장 가능한 백엔드 서비스를 구축합니다. 트랜잭션 정합성과 성능 최적화, 운영 자동화를 통해 비즈니스 임팩트를 만드는 엔지니어입니다.',
    skills: ['Java', 'Spring Boot', 'MySQL', 'JPA', 'AWS', 'Kafka', 'Flink', 'ClickHouse'],
    focusAreas: [
      '분산 시스템 설계',
      'API 아키텍처',
      '트랜잭션 정합성',
      '성능 최적화',
      '안정성/확장성',
      'DDD',
      '운영 및 관측성',
    ],
  },
  data: {
    label: '데이터 엔지니어',
    position: 'Data Engineer',
    introduction:
      '배치/스트리밍 파이프라인을 설계하고 데이터 모델링, 품질 관리, 분석 서빙까지 전 과정을 구축합니다. 데이터 처리 성능 최적화와 거버넌스를 통해 분석 생산성과 의사결정 속도를 높입니다.',
    skills: [
      'Kafka',
      'Flink',
      'Spark',
      'Delta Lake',
      'ClickHouse',
      'Redis',
      'DuckDB',
      'MySQL',
      'AWS',
      'Java',
    ],
    focusAreas: [
      '데이터 파이프라인',
      '스트리밍/배치 처리',
      '데이터 모델링',
      '데이터 품질/거버넌스',
      '데이터 레이크/웨어하우스',
      'ETL/ELT 최적화',
      '분석 플랫폼 영향도',
    ],
  },
};

const projectOverrides: Record<ResumeTrack, Record<string, ProjectOverride>> = {
  backend: {
    '모노리스::데이터 분석 업무 자동화 PoC': {
      description: '수작업 분석 요청 프로세스를 서비스 백엔드와 분리된 CDC 구조로 전환.',
      achievements: [
        'CDC 파이프라인을 설계/구현해 운영 서비스와 분석 워크로드를 분리',
        '운영 DB 부하 없이 실시간 조회 가능한 데이터 경로 설계',
        '분석 리드타임 1-2시간 -> 즉시 조회로 단축, 재요청 0건 달성',
        '스타 스키마 + DQ 적용으로 분석 결과 신뢰성과 재현성 강화',
      ],
    },
    '모노리스::글로벌 플랫폼 재설계': {
      description: '제주파크 전용 IoT 시스템을 글로벌 확장 가능한 차세대 백엔드 아키텍처로 전환.',
      achievements: [
        'DDD + Hexagonal Architecture 도입을 주도해 도메인 중심 구조 정착',
        'IoT 디바이스/현장 데이터 수집 서버를 글로벌 확장 가능한 구조로 재설계',
        '실내 액티비티 도메인 설계 및 서비스 구조 전환 참여',
        '테스트 코드 생성 AI 프롬프트를 공유해 검증 생산성 향상',
        '팀 스터디와 점진적 도입으로 아키텍처 전환 리스크 완화',
      ],
    },
    '엑심베이::지급대행 서비스 신규 구축': {
      achievements: [
        'PL로 참여해 3인 팀 리소스 분배 및 일정 관리',
        '거래/정산/송금 도메인 추상화로 비즈니스 규칙을 서비스 계층에 정착',
        '지급지시/판매자/서브몰/사업자 관계를 60개+ 엔티티로 모델링',
        '지급대행 Open API 19개 설계/개발',
        '테스트 코드 100건+ 작성 및 외부 연동 초기 장애 0건 달성',
      ],
    },
    '엑심베이::차액정산 자동화': {
      achievements: [
        '반기별 400만건+ 사업자 데이터 기반 차액정산 프로세스 구축',
        '구간 변경 이력 관리 및 과거 거래 소급 정산 구조 설계로 정합성 강화',
        '순수 Java Batch 기반 대용량 처리 성능 최적화',
        '수수료 적용 오류로 인한 매출 손실 리스크 제거',
      ],
    },
    '엑심베이::운영 자동화 및 백오피스 시스템 개선': {
      achievements: [
        '운영팀 Pain Point를 주도적으로 수집/개선',
        '백오피스 UI/UX 개선 및 운영 자동화 50건+ 수행',
        '통계/조회 페이지 SQL 튜닝으로 성능 75% 개선(15,000ms -> 2,000ms)',
        '반복 업무 자동화로 운영팀 주당 4시간+ 절감',
        '모니터링 알림 중요도 분리로 장애 대응 시간 단축',
      ],
    },
    '개인 금융 데이터 분석 플랫폼': {
      description: 'Spark + Delta Lake 기반으로 분석 친화적 데이터 플랫폼 백엔드를 구축.',
    },
    '실시간 CTR 분석 파이프라인 구축': {
      description: '실시간 지표 계산/서빙을 위한 Kafka-Flink 기반 스트리밍 시스템 설계 및 구현.',
    },
  },
  data: {
    '모노리스::데이터 분석 업무 자동화 PoC': {
      description: '수작업 분석 프로세스를 CDC 기반 데이터 파이프라인으로 전환.',
      achievements: [
        'CDC 파이프라인 설계/구현으로 데이터 수집 자동화',
        '운영 DB 부하 없이 실시간 분석 가능한 구조 설계',
        '분석 리드타임 1-2시간 -> 즉시 조회로 단축, 재요청 0건 달성',
        '스타 스키마 모델링 및 DQ 도입으로 데이터 품질 체계 강화',
      ],
    },
    '모노리스::글로벌 플랫폼 재설계': {
      description: '글로벌 확장 대비를 위해 도메인 구조와 데이터 흐름을 재정비한 차세대 플랫폼 구축.',
      achievements: [
        'DDD + Hexagonal Architecture 도입으로 데이터 경계와 책임을 명확화',
        '실내 액티비티 도메인 설계를 통해 데이터 모델 확장성 확보',
        '테스트 코드 생성 AI 프롬프트 공유로 데이터 변경 검증 효율 개선',
        '팀 스터디와 점진적 도입으로 전환 비용과 리스크를 통제',
      ],
    },
    '엑심베이::지급대행 서비스 신규 구축': {
      achievements: [
        '3인 팀 PL로 일정/리소스를 관리하며 서비스 론칭 주도',
        '거래/정산/송금 도메인 재설계로 데이터 표준화 기반 마련',
        '지급지시/판매자/서브몰/사업자 관계를 60개+ 엔티티로 모델링',
        'Open API 19개 개발로 외부 시스템 데이터 연계 채널 확장',
        '테스트 코드 100건+ 작성 및 외부 연동 초기 장애 0건 달성',
      ],
    },
    '엑심베이::차액정산 자동화': {
      achievements: [
        '반기별 400만건+ 사업자 데이터 관리 및 차액정산 파이프라인 구축',
        '구간 변경 이력과 과거 거래 소급 정산 로직 설계로 데이터 정합성 강화',
        '순수 Java Batch 기반 대용량 처리 및 성능 최적화',
        '전 사업자 데이터 보존으로 수수료 적용 오류 리스크 제거',
      ],
    },
    '엑심베이::운영 자동화 및 백오피스 시스템 개선': {
      achievements: [
        '운영 데이터 활용 과정의 Pain Point를 주도적으로 개선',
        '백오피스 기능 개선/자동화 50건+ 수행으로 운영 효율 증대',
        '통계/조회 페이지 SQL 튜닝으로 성능 75% 개선(15,000ms -> 2,000ms)',
        '반복 업무 자동화로 운영팀 주당 4시간+ 절감',
        '모니터링 알림 중요도 분리로 장애 대응 속도 향상',
      ],
    },
    '개인 금융 데이터 분석 플랫폼': {
      description:
        'Apache Spark + Delta Lake 기반 Medallion Architecture(Bronze/Silver/Gold)로 개인 금융 데이터 분석 플랫폼 구축.',
      achievements: [
        'Raw -> 분석 마트까지 이어지는 Medallion 파이프라인 구현',
        'Star Schema(Fact/Dim) 설계로 분석 질의 성능 및 재사용성 향상',
        'Delta Lake ACID/Time Travel 활용으로 데이터 신뢰성과 추적성 강화',
        'Spark Partitioning/Caching 전략으로 대용량 처리 성능 최적화',
      ],
    },
    '실시간 CTR 분석 파이프라인 구축': {
      description:
        '광고 CTR 지표를 실시간 계산/서빙하는 Kafka-Flink 기반 스트리밍 파이프라인 설계 및 구현.',
      achievements: [
        '워터마크 기반 이벤트 시간 처리로 Out-of-Order 데이터 정합성 확보',
        'Redis(실시간 API), ClickHouse(분석), DuckDB(검증) 멀티 싱크 구조 설계',
        'Backpressure 및 파티션 skew 대응 전략으로 고처리량 안정성 확보',
        '지속적인 튜닝으로 대용량 트래픽 환경의 처리 성능 개선',
      ],
    },
  },
};

const projectVisibility: Record<ResumeTrack, ProjectVisibility> = {
  backend: {
    experience: [
      '모노리스::영상 시스템 글로벌 플랫폼 구축',
      '모노리스::글로벌 플랫폼 재설계',
      '엑심베이::지급대행 서비스 신규 구축',
      '엑심베이::거래 원장 이상거래 탐지 및 차지백 자동화',
      '엑심베이::운영 자동화 및 백오피스 시스템 개선',
    ],
    personal: [],
  },
  data: {
    experience: [
      '모노리스::데이터 분석 업무 자동화 PoC',
      '엑심베이::차액정산 자동화',
    ],
    personal: [
      '개인 금융 데이터 분석 플랫폼',
      '실시간 CTR 분석 파이프라인 구축',
    ],
  },
};

const isVisibleProject = (
  track: ResumeTrack,
  company: string,
  projectTitle: string,
  section: 'experience' | 'personal',
) => {
  if (section === 'experience') {
    return projectVisibility[track].experience.includes(`${company}::${projectTitle}`);
  }
  return projectVisibility[track].personal.includes(projectTitle);
};

const getProjectOverride = (
  track: ResumeTrack,
  company: string,
  projectTitle: string,
): ProjectOverride | undefined => {
  return (
    projectOverrides[track][`${company}::${projectTitle}`] ??
    projectOverrides[track][projectTitle]
  );
};

export default async function ResumePage({
  searchParams,
}: {
  searchParams?: Promise<{ track?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const activeTrack: ResumeTrack = resolvedSearchParams?.track === 'data' ? 'data' : 'backend';
  const variant = resumeVariants[activeTrack];
  const filteredExperiences = experiences
    .map((exp) => ({
      ...exp,
      projects: exp.projects.filter((project) =>
        isVisibleProject(activeTrack, exp.company, project.title, 'experience'),
      ),
    }))
    .filter((exp) => exp.projects.length > 0);
  const filteredPersonalProjects = personalProjects.filter((project) =>
    isVisibleProject(activeTrack, project.title, project.title, 'personal'),
  );
  // Calculate years of experience (Start: Dec 2019)
  const startDate = new Date(2019, 12); // Month is 0-indexed (11 = Dec)
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  const m = now.getMonth() - startDate.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < startDate.getDate())) {
    years--;
  }

  // Calculate period duration from "YYYY.MM - YYYY.MM" or "YYYY.MM - 재직 중" format
  const calculateDuration = (period: string): string => {
    const parts = period.split(' - ');
    if (parts.length !== 2) return '';

    const parseDate = (str: string): Date | null => {
      if (str.includes('재직 중')) return new Date();
      const [year, month] = str.split('.').map(Number);
      if (!year || !month) return null;
      return new Date(year, month - 1);
    };

    const startDate = parseDate(parts[0]);
    const endDate = parseDate(parts[1]);

    if (!startDate || !endDate) return '';

    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
    const calcYears = Math.floor(months / 12);
    const calcMonths = months % 12;

    if (calcYears > 0 && calcMonths > 0) {
      return `${calcYears}년 ${calcMonths}개월`;
    } else if (calcYears > 0) {
      return `${calcYears}년`;
    } else {
      return `${calcMonths}개월`;
    }
  };

  return (
    <>
      <Header />

      <main className="py-16 bg-[var(--color-bg-primary)]">
        <Container size="md">
          {/* Profile Header */}
          <header className="mb-12">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                직무
              </span>
              <div className="inline-flex p-1 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
                <Link
                  href="/resume?track=backend"
                  className={`px-3 py-1.5 text-sm rounded-[var(--radius-sm)] transition-colors ${activeTrack === 'backend'
                    ? 'bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-semibold'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }`}
                >
                  백엔드 엔지니어
                </Link>
                <Link
                  href="/resume?track=data"
                  className={`px-3 py-1.5 text-sm rounded-[var(--radius-sm)] transition-colors ${activeTrack === 'data'
                    ? 'bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-semibold'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }`}
                >
                  데이터 엔지니어
                </Link>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-6">
              Resume
            </h1>

            <div className="flex flex-col gap-2 mb-4">
              <h2 className="text-2xl text-[var(--color-text-primary)]">
                {personalInfo.name}
              </h2>
              <p className="text-xl text-[var(--color-text-secondary)] font-medium">
                {variant.position}
              </p>
              {variant.introduction && (
                <p className="text-[var(--color-text-secondary)] mt-2 leading-relaxed">
                  {variant.introduction}
                </p>
              )}
            </div>

            {/* Contact & Links */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-[var(--color-text-secondary)]">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 hover:text-[var(--color-toss-blue)] transition-colors"
              >
                <span className="tossface">📧</span>
                {personalInfo.email}
              </a>
              {personalInfo.phone && (
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-2 hover:text-[var(--color-toss-blue)] transition-colors"
                >
                  <span className="tossface">📱</span>
                  {personalInfo.phone}
                </a>
              )}
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[var(--color-toss-blue)] transition-colors"
              >
                <span className="tossface">🐱</span>
                GitHub
              </a>
              {personalInfo.blog && (
                <a
                  href={personalInfo.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[var(--color-toss-blue)] transition-colors"
                >
                  <span className="tossface">📝</span>
                  Blog
                </a>
              )}
            </div>
          </header>

          {/* Focus Areas Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8 flex items-center gap-2">
              <span className="tossface text-3xl">🎯</span> Focus Areas
            </h2>
            <div className="flex flex-wrap gap-3">
              {variant.focusAreas.map((focus) => (
                <span
                  key={focus}
                  className="px-4 py-2 bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] rounded-[var(--radius-md)] font-medium border border-[var(--color-border)]"
                >
                  {focus}
                </span>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8 flex items-center gap-2">
              <span className="tossface text-3xl">🛠️</span> Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {variant.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] rounded-[var(--radius-md)] font-medium border border-[var(--color-border)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section className="space-y-16">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8 flex items-center gap-2 border-b border-[var(--color-border)] pb-4">
              <span className="tossface text-3xl">💼</span>
              Experience
              <span className="ml-2 text-base font-bold text-[var(--color-toss-blue)] bg-[var(--color-toss-blue)]/10 px-3 py-0.5 rounded-full align-middle">
                {years}년 +
              </span>
            </h2>

            {filteredExperiences.map((exp, index) => (
              <article key={index} className="relative pl-4 md:pl-0">
                {/* Visual Timeline Line for mobile */}
                <div className="absolute left-0 top-2 bottom-0 w-[2px] bg-[var(--color-border)] md:hidden"></div>

                <div className="grid md:grid-cols-[200px_1fr] gap-8">
                  {/* Left Column: Company & Period */}
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                        {exp.company}
                      </h3>
                      <p className="text-[var(--color-text-secondary)] font-medium text-sm">
                        {exp.role}
                      </p>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm text-[var(--color-text-tertiary)]">
                        {exp.period}
                      </span>
                      <span className="text-xs text-[var(--color-toss-blue)] font-medium">
                        {calculateDuration(exp.period)}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Projects */}
                  <div className="space-y-12">
                    {exp.projects.map((project, pIndex) => (
                      <div key={pIndex} className="relative group">
                        {(() => {
                          const override = getProjectOverride(activeTrack, exp.company, project.title);
                          const description = override?.description ?? project.description;
                          const achievements = override?.achievements ?? project.achievements;
                          return (
                            <>
                              <h4 className="text-xl font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-toss-blue)] transition-colors">
                                {project.title}
                              </h4>
                              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                                {description}
                              </p>

                              <ul className="space-y-2 mb-6 pl-0 ml-0 list-none">
                                {achievements.map((achievement, aIndex) => (
                                  <li
                                    key={aIndex}
                                    className="flex items-start gap-2 text-[var(--color-text-secondary)] text-base leading-relaxed"
                                  >
                                    <span className="tossface text-sm mt-0.5 shrink-0">
                                      ✔️
                                    </span>
                                    <span>{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </>
                          );
                        })()}

                        {project.links && project.links.length > 0 && (
                          <div className="flex gap-3 mt-4">
                            {project.links.map((link, lIndex) => (
                              <a
                                key={lIndex}
                                href={link.href}
                                target={link.external ? '_blank' : '_self'}
                                rel={link.external ? 'noopener noreferrer' : ''}
                                className="text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-toss-blue)] flex items-center gap-1.5 transition-colors bg-[var(--color-bg-secondary)] px-3 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--color-toss-blue)]/10"
                              >
                                {link.external ? (
                                  <span className="tossface text-sm">🔗</span>
                                ) : (
                                  <span className="tossface text-sm">📄</span>
                                )}
                                {link.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* Personal Projects Section */}
          {filteredPersonalProjects.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8 flex items-center gap-2 border-b border-[var(--color-border)] pb-4">
                <span className="tossface text-3xl">🚀</span> Personal Projects
              </h2>

              {filteredPersonalProjects.map((project, index) => (
                <article key={index} className="relative pl-4 md:pl-0 mb-12 last:mb-0">
                {/* Visual Timeline Line for mobile */}
                <div className="absolute left-0 top-2 bottom-0 w-[2px] bg-[var(--color-border)] md:hidden"></div>

                <div className="grid md:grid-cols-[200px_1fr] gap-8">
                  {/* Left Column: Role & Period */}
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                        {project.title}
                      </h3>
                      <p className="text-[var(--color-text-secondary)] font-medium text-sm">
                        {project.role}
                      </p>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm text-[var(--color-text-tertiary)]">
                        {project.period}
                      </span>
                      <span className="text-xs text-[var(--color-toss-blue)] font-medium">
                        {calculateDuration(project.period)}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Project Details */}
                  <div className="space-y-6">

                    <div>
                      {(() => {
                        const override = getProjectOverride(activeTrack, project.title, project.title);
                        const description = override?.description ?? project.description;
                        const achievements = override?.achievements ?? project.achievements;
                        return (
                          <>
                            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                              {description}
                            </p>

                            <ul className="space-y-2 mb-6 pl-0 ml-0 list-none">
                              {achievements.map((achievement, aIndex) => (
                                <li
                                  key={aIndex}
                                  className="flex items-start gap-2 text-[var(--color-text-secondary)] text-base leading-relaxed"
                                >
                                  <span className="tossface text-sm mt-0.5 shrink-0">
                                    ✔️
                                  </span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        );
                      })()}

                      {project.links && project.links.length > 0 && (
                        <div className="flex gap-3 mt-4">
                          {project.links.map((link, lIndex) => (
                            <a
                              key={lIndex}
                              href={link.href}
                              target={link.external ? '_blank' : '_self'}
                              rel={link.external ? 'noopener noreferrer' : ''}
                              className="text-sm font-medium text-[var(--color-text-primary)] hover:text-[var(--color-toss-blue)] flex items-center gap-1.5 transition-colors bg-[var(--color-bg-secondary)] px-3 py-2 rounded-[var(--radius-sm)] hover:bg-[var(--color-toss-blue)]/10"
                            >
                              {link.external ? (
                                <span className="tossface text-sm">🔗</span>
                              ) : (
                                <span className="tossface text-sm">📄</span>
                              )}
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                </article>
              ))}
            </section>
          )}

          {/* Education Section */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8 flex items-center gap-2 border-b border-[var(--color-border)] pb-4">
              <span className="tossface text-3xl">🎓</span> Education
            </h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-8"
                >
                  <div className="md:text-right">
                    <span className="inline-block px-3 py-1 bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] text-sm font-medium rounded-full">
                      {edu.period}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                      {edu.school}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] mt-1">
                      {edu.degree} | {edu.major}
                    </p>
                    <span className="inline-block mt-2 px-2 py-1 bg-[var(--color-toss-blue)]/10 text-[var(--color-toss-blue)] text-xs font-medium rounded">
                      {edu.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Activities Section */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8 flex items-center gap-2 border-b border-[var(--color-border)] pb-4">
              <span className="tossface text-3xl">🌟</span> Activities
            </h2>
            <div className="space-y-8">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-8"
                >
                  <div className="md:text-right">
                    <span className="inline-block px-3 py-1 bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] text-sm font-medium rounded-full">
                      {activity.period}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
                      {activity.title}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] font-medium mb-4">
                      {activity.organization}
                    </p>
                    <ul className="space-y-2 pl-0 ml-0 list-none">
                      {activity.description.map((desc, dIndex) => (
                        <li
                          key={dIndex}
                          className="flex items-start gap-2 text-[var(--color-text-secondary)] text-base leading-relaxed"
                        >
                          <span className="tossface text-sm mt-0.5 shrink-0">
                            ✔️
                          </span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications Section */}
          <section className="mt-16 mb-16">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8 flex items-center gap-2 border-b border-[var(--color-border)] pb-4">
              <span className="tossface text-3xl">📜</span> Certifications
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="p-6 bg-[var(--color-bg-secondary)] rounded-[var(--radius-md)] border border-[var(--color-border)] transition-colors"
                >
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-1">
                    {cert.issuer}
                  </p>
                  <p className="text-[var(--color-text-tertiary)] text-sm">
                    {cert.date}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Container>
      </main>
    </>
  );
}
