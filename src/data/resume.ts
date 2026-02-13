export interface Experience {
  company: string;
  role: string;
  period: string;
  projects: ExperienceProject[];
}

export type ExperienceStageKey =
  | 'problem'
  | 'decision'
  | 'implementation'
  | 'verification'
  | 'result'
  | 'extension';

export interface ExperienceStage {
  key: ExperienceStageKey;
  label: string;
  detail: string;
}

export interface ExperienceProject {
  title: string;
  description: string;
  stages: ExperienceStage[];
  links?: ProjectLink[];
}

export interface PersonalProject {
  title: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  links?: ProjectLink[];
}

export interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface PersonalInfo {
  name: string;
  birthDate: string;
  position: string;
  // keywords: string;
  email: string;
  phone?: string;
  github: string;
  blog?: string;
  skills: string[];
  introduction?: string;
}

export interface Education {
  school: string;
  degree: string;
  major: string;
  period: string;
  status: string;
}

export interface Activity {
  organization: string;
  title: string;
  period: string;
  description: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export const personalInfo: PersonalInfo = {
  name: '박은우',
  birthDate: '1996.07.20',
  position: 'Software Engineer',
  // keywords: 'BE, DE, Platform',
  email: 'une@kakao.com',
  phone: '+82 01029139706',
  github: 'https://github.com/dev-wooyeon',
  blog: 'https://eunu-log.vercel.app',
  skills: [
    'Java',
    'Spring Boot',
    'MySQL',
    'AWS',
    'Kafka',
    'Flink',
    'ClickHouse',
    'JPA',
  ],
  introduction:
    '결제·정산·데이터 파이프라인처럼 오류 비용이 큰 도메인에서 문제를 구조로 해결하는 백엔드 엔지니어입니다. 기능 구현보다 문제 정의와 의사결정 기준을 먼저 합의하고, 변경 영향 범위를 줄이는 설계와 자동화로 사용자와 운영팀의 시간을 절약하는 데 집중합니다.',
};

export const experiences: Experience[] = [
  {
    company: '모노리스',
    role: '백엔드 엔지니어 • IoT팀',
    period: '2023.04 - 재직 중',
    projects: [
      {
        title: '데이터 분석 업무 자동화 PoC',
        description:
          '운영 DB 직접 조회와 수작업 검증으로 반복되던 분석 요청을 시스템화하기 위해 CDC 기반 분석 파이프라인 PoC를 설계·구현.',
        stages: [
          {
            key: 'problem',
            label: '문제 정의',
            detail:
              '요청마다 쿼리 수정·검증이 필요해 분석 리드타임 1-2시간, 월 평균 수동 대응 4회가 발생',
          },
          {
            key: 'decision',
            label: '의사결정',
            detail:
              '운영 부하와 데이터 최신성을 함께 만족하기 위해 배치 마트 대신 CDC(DMS→S3→Glue→Athena) 구조 선택',
          },
          {
            key: 'implementation',
            label: '구현',
            detail:
              '반복 조회 패턴(날짜·상품·상태)에 맞춰 스타 스키마를 설계하고 Glue 단계에서 DQ(Null·타입·무결성) 검증 적용',
          },
          {
            key: 'result',
            label: '결과/사용자 이점',
            detail:
              '즉시 조회 체계로 전환해 재요청 0건을 달성하고, 분석 대응 시간을 주당 약 2시간 절감',
          },
        ],
        links: [
          {
            label: '회고',
            href: '/blog/data-analysis-pipeline-poc',
            external: true,
          },
        ],
      },
      {
        title: '글로벌 플랫폼 재설계',
        description:
          '제주파크 전용 구조를 멀티 파크 확장형 플랫폼으로 전환하기 위해 도메인 중심 아키텍처를 재설계.',
        stages: [
          {
            key: 'problem',
            label: '문제 정의',
            detail:
              '파크 추가 시 시스템 복제와 조건문 누적으로 변경 영향 범위를 예측하기 어려운 구조',
          },
          {
            key: 'decision',
            label: '의사결정',
            detail:
              '단기 보수보다 장기 안정성을 우선해 DDD + Hexagonal Architecture(책임 분리, 테스트 가능성)를 채택',
          },
          {
            key: 'implementation',
            label: '구현',
            detail:
              '메타데이터·상태·기록·로그·제어 도메인 경계를 재정의하고 포트/어댑터로 인프라 의존성 분리',
          },
          {
            key: 'extension',
            label: '전환 전략',
            detail:
              '티켓 도메인부터 점진 적용하고 팀 스터디/가이드 공유로 설계 합의와 도입 리스크를 관리',
          },
          {
            key: 'result',
            label: '결과/사용자 이점',
            detail:
              '신규 파크를 설정 중심으로 확장 가능한 기반을 확보해 기능 변경 시 타 파크 영향 리스크를 낮춤',
          },
        ],
        links: [
          {
            label: '회고',
            href: '/blog/platform-system-review',
            external: true,
          },
        ],
      },
    ],
  },
  {
    company: '엑심베이',
    role: '소프트웨어 개발자 • PG플랫폼팀',
    period: '2019.12 - 2023.03',
    projects: [
      {
        title: '지급대행 서비스 신규 구축',
        description:
          '오픈마켓 판매 대금을 안전하게 위탁 송금할 수 있도록 거래·정산·송금 흐름을 분리한 지급대행 Open API 서비스를 신규 구축.',
        stages: [
          {
            key: 'problem',
            label: '문제 정의',
            detail:
              '거래·정산·송금 로직이 한 흐름에 섞여 있어 변경 시 금전 사고 리스크가 커지는 구조',
          },
          {
            key: 'decision',
            label: '의사결정',
            detail:
              '금전 도메인 안정성을 최우선 기준으로 도메인 책임을 분리하고 명시적 인터페이스로 통신하도록 설계',
          },
          {
            key: 'implementation',
            label: '구현',
            detail:
              '3인 팀 PL로 일정/우선순위를 관리하며 30개+ 테이블 재설계와 지급대행 핵심 API 19개 개발',
          },
          {
            key: 'verification',
            label: '검증',
            detail:
              '핵심 로직 테스트 100개+와 CI 자동 검증을 도입해 변경 영향 범위를 사전 확인',
          },
          {
            key: 'result',
            label: '결과/사용자 이점',
            detail:
              '외부 고객사 초기 연동 장애 0건을 달성했고, 변경 예측 가능성이 높아져 팀 생산성 약 20% 개선',
          },
        ],
        links: [
          {
            label: '회고',
            href: '/blog/payment-system-design',
            external: true,
          },
        ],
      },
      {
        title: '영중소 구간변경 차액정산 자동화',
        description:
          '여신금융협회 반기 데이터(약 400만 건+)를 기반으로 영세·중소 구간 변경 이력을 관리하는 차액정산 자동화 시스템을 구축.',
        stages: [
          {
            key: 'problem',
            label: '문제 정의',
            detail:
              '정책 데이터가 반기마다 재정의되고 과거 거래와 충돌해 수작업 검증과 누락 리스크가 반복',
          },
          {
            key: 'decision',
            label: '의사결정',
            detail:
              '현재 상태보다 이력 추적을 우선해 원천 데이터 전체 저장 + 반기 스냅샷 + 변경 이력 모델을 선택',
          },
          {
            key: 'implementation',
            label: '구현',
            detail:
              'Spring Batch 청크 처리와 인덱스 최적화로 400만 건+ 대용량 데이터를 안정적으로 반복 처리',
          },
          {
            key: 'result',
            label: '결과/사용자 이점',
            detail:
              '반기 정산을 자동화하고 신규/변경 가맹점 누락 위험을 제거해 수수료 오적용으로 인한 매출 손실 리스크를 차단',
          },
        ],
        links: [
          {
            label: '회고',
            href: '/blog/settlement-automation',
            external: true,
          },
        ],
      },
      {
        title: '운영 자동화 및 백오피스 시스템 개선',
        description:
          '운영팀이 기다리는 시간을 줄이고 판단에 집중할 수 있도록 백오피스 성능 개선·자동화·모니터링 체계를 재구성.',
        stages: [
          {
            key: 'problem',
            label: '문제 정의',
            detail:
              '핵심 조회 화면 로딩 15초+, 반복 수동 작업, 단일 알림 채널로 인한 장애 신호 누락이 발생',
          },
          {
            key: 'decision',
            label: '의사결정',
            detail:
              '운영 요청 단건 대응 대신 운영 흐름 기준(자동화 우선, 자주 쓰는 화면 성능 우선, 알림 중요도 분리)으로 개선 전략 수립',
          },
          {
            key: 'implementation',
            label: '구현',
            detail:
              'EXPLAIN 기반 병목 쿼리 개선, 복합 인덱스 적용, N+1 제거, 페이지네이션 개선 및 자동화 과제 50건+ 수행',
          },
          {
            key: 'result',
            label: '결과/사용자 이점',
            detail:
              '주요 조회 응답을 15,000ms → 2,000ms로 단축하고 운영팀 반복 업무를 주당 4시간 이상 절감',
          },
          {
            key: 'extension',
            label: '모니터링',
            detail:
              '긴급/일반 알림 채널을 분리해 장애 인지와 대응을 5분 이내로 단축',
          },
        ],
        links: [
          {
            label: '회고',
            href: '/blog/operation-automation',
            external: true,
          },
        ],
      },
    ],
  },
];

export const personalProjects: PersonalProject[] = [
  {
    title: '개인 금융 데이터 분석 플랫폼',
    role: '데이터 엔지니어링',
    period: '2026.01 - 2026.02',
    description:
      '원천 데이터부터 분석 마트까지 일관된 품질을 유지하기 위해 Spark + Delta Lake 기반 개인 금융 분석 플랫폼을 구축.',
    achievements: [
      '의사결정: 데이터 신뢰성과 재현성을 기준으로 Medallion(Bronze/Silver/Gold) 아키텍처를 채택',
      '구현: Raw 적재부터 정제·집계·분석 마트까지 이어지는 파이프라인과 Fact/Dimension 기반 Star Schema 설계',
      '검증: Delta Lake ACID 및 Time Travel을 활용해 데이터 정합성과 변경 이력 추적성을 확보',
      '사용자 이점: 분석가가 재가공 없이 바로 조회 가능한 구조를 제공해 분석 준비 시간을 단축',
    ],
    links: [
      {
        label: '코드 저장소',
        href: 'https://github.com/dev-wooyeon/demo-finance-engine',
        external: true,
      },
    ],
  },
  {
    title: '실시간 CTR 분석 파이프라인 구축',
    role: '데이터 엔지니어링',
    period: '2025.11 - 2025.12',
    description:
      '광고 CTR을 실시간으로 계산·제공하기 위해 Kafka-Flink 기반 스트리밍 파이프라인을 설계하고, 로컬 제약 환경에서 성능 최적화까지 수행.',
    achievements: [
      '문제 정의: Out-of-Order 이벤트, 파티션 skew, Backpressure가 동시에 발생하는 환경에서 정확도와 지연시간을 함께 만족해야 하는 과제',
      '의사결정: Event Time + Watermark + Allowed Lateness 조합을 실험해 지연·정확도 균형 지점을 선택',
      '구현: Kafka/Flink/Redis/ClickHouse/DuckDB 멀티 싱크와 체크포인트 기반 Exactly-Once 처리, 파티션 3→6→12 확장',
      '결과: 25분간 약 120만 건 처리(초당 약 812건)와 집계 정확도를 검증하고 부하 구간 대응 전략을 확보',
      '성능 최적화: Redis+Serving API를 제거하고 ClickHouse Materialized View 중심으로 단순화해 약 1GB 메모리 절감, 평균 20k/s·스파이크 55k/s 처리',
    ],
    links: [
      {
        label: '코드 저장소',
        href: 'https://github.com/dev-wooyeon/ctr-pipeline',
        external: true,
      },
      {
        label: '설계 회고',
        href: '/blog/ctr-pipeline',
        external: true,
      },
      {
        label: '성능 최적화 회고',
        href: '/blog/macbook-air-m1-life',
        external: true,
      },
    ],
  },
];

export const education: Education[] = [
  {
    school: '학점은행제',
    degree: '학사',
    major: '컴퓨터공학과',
    period: '2025.06 - 2026.02',
    status: '졸업',
  },
  {
    school: '비트캠프',
    degree: '사설 교육',
    major: '소프트웨어 엔지니어링 양성 과정',
    period: '2019.02 - 2019.08',
    status: '수료',
  },
  {
    school: '수원과학대학교',
    degree: '전문학사',
    major: '컴퓨터정보과',
    period: '2015.03 - 2019.02',
    status: '졸업',
  },
];

export const activities: Activity[] = [
  {
    organization: '인프런',
    title: '멘토링 활동',
    period: '2025.02 - 2025.12',
    description: [
      '누적 100회 이상의 개발자 커리어 멘토링 진행',
      '취업준비생 및 주니어 개발자들의 이력서 및 포트폴리오 첨삭을 통한 서류 합격률 개선 지원',
      '기술적 문제 해결(Troubleshooting) 및 학습 방향성에 대한 객관적 조언 제공',
      '결제·정산·플랫폼 재설계·데이터 파이프라인 주제의 회고를 작성하고 스터디/리뷰에 활용',
    ],
  },
  {
    organization: '1군 사령부 예하부대 11정보통신단',
    title: '대한민국 육군',
    period: '2016.02 - 2019.02',
    description: [
      '병장 만기제대',
    ],
  }
];

export const certifications: Certification[] = [
  {
    name: 'SQLD',
    issuer: '한국데이터산업진흥원',
    date: '2023.07',
  },
  {
    name: '정보처리산업기사',
    issuer: '국가산업진흥원',
    date: '2022.06',
  },
  {
    name: 'ITQ OA Master',
    issuer: '한국생산성본부',
    date: '2019.02',
  },
  {
    name: '유단증 4단',
    issuer: '대한해동검도협회',
    date: '2013.02',
  },
];
