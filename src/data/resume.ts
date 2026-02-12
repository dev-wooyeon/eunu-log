export interface Experience {
  company: string;
  role: string;
  period: string;
  projects: Project[];
}

export interface PersonalProject {
  title: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  links?: ProjectLink[];
}

export interface Project {
  title: string;
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
    'QueryDSL',
    'AWS',
    'AWS DMS',
    'AWS Glue',
    'AWS Athena',
    'Kafka',
    'Flink',
    'Spark',
    'Delta Lake',
    'Airflow',
    'Redis',
    'DuckDB',
    'ClickHouse',
    'JPA',
    'MongoDB',
    'Docker',
    'Kubernetes',
    'Grafana',
  ],
  introduction:
    '사용자 가치 중심의 문제 해결에 몰두하며, 안정적이고 확장 가능한 시스템을 설계하고 구현합니다. 데이터 기반의 깊은 통찰로 기술적 난제를 극복하고, 팀과 함께 성장하는 과정에서 최고의 성과를 창출하는 Software Engineer입니다.',
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
          '수작업 기반 분석 프로세스를 CDC 파이프라인으로 전환.',
        achievements: [
          'AWS DMS-S3-Glue-Athena 기반 CDC 데이터 파이프라인 설계 및 구현.',
          '외부 MongoDB 데이터를 S3 Parquet로 실시간 복제하여 분석 가능 구조 확장.',
          '운영 DB 부하 없이 실시간 분석 가능한 구조 설계.',
          '분석 리드타임 1-2시간 → 즉시 조회, 재요청 0건',
          '스타 스키마 모델링 및 DQ 도입으로 데이터 품질 체계 구축',
          'ELT 패러다임과 SQL 최적화로 분석 쿼리 성능 및 운영 비용 개선',
          'Airflow·PySpark·DuckDB 기반 로컬 검증 환경으로 개발/테스트 효율 향상',
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
        title: '영상 시스템 글로벌 플랫폼 구축',
        description:
          '제주파크 중심 구조의 영상 시스템을 글로벌 확장 가능한 API 기반 플랫폼으로 재설계.',
        achievements: [
          'AWS SQS 재시도/보관 전략을 참고한 커스텀 Queue 설계로 비동기 처리 안정성 확보',
          'FFMpeg 커맨드 최적화로 영상 처리 성능 50% 개선 (16,000ms → 8,000ms)',
          '인스턴스 수 8대 → 5대로 축소해 서버 비용 최적화',
          '5개 이상 액티비티별 영상 편집 로직을 서비스 단위로 분리해 확장성 개선',
          'Grafana 기반 메트릭 대시보드 구성으로 실시간 운영 관측성 확보',
          'Spring Batch를 활용한 영상 통계 자료 생성 자동화',
        ],
      },
      {
        title: '글로벌 플랫폼 재설계',
        description:
          '제주파크 전용 IoT 시스템을 글로벌 확장 대비를 위해 차세대 시스템으로 재설계.',
        achievements: [
          'DDD + Hexagonal Architecture 도입 주도',
          'IoT 디바이스/현장 데이터 수집 서버를 글로벌 확장 가능한 구조로 전환',
          '실내 액티비티 도메인 설계 및 아키텍처 전환 참여',
          '테스트 코드 생성 AI 활용 프롬프트 공유',
          '팀 스터디와 점진적 도입으로 개발 문화 개선',
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
          '송금 업무를 수행하는 국내 오픈마켓 사업자를 위해 각각의 판매자에게서 발생한 매출을 위탁 송금을 하기 위한 Open API 서비스 구축',
        achievements: [
          'PL로 참여하여 3인으로 구성된 팀의 리소스 분배 및 일정 관리',
          '거래, 정산, 송금 개념을 추상화하여 도메인 중심으로 재설계',
          '지급지시/판매자/서브몰/사업자 등 복잡 관계를 60개+ 엔티티로 모델링',
          'OpenAPI 시스템 구축 및 지급대행 서비스 API 19개 개발',
          '테스트 코드 100건+ 작성 및 외부 연동 초기 장애 0건 달성'
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
        title: '차액정산 자동화',
        description:
          '여신금융협회에서 반기마다 제공하는 약 400만건 이상의 국내 모든 사업자 데이터를 관리하고 차액정산을 위한 프로세스 구축',
        achievements: [
          '반기별 영중소 구간 국내 사업자 데이터 관리 및 차액정산 프로세스 구축.',
          '구간 변경 이력 관리 및 과거 거래 소급 정산 구조 설계',
          '순수 Java Batch 기반 대용량 처리 및 성능 최적화',
          '모든 사업자 데이터를 저장하여 수수료 적용 오류로 인한 매출 손실 리스크 제거',
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
        title: '거래 원장 이상거래 탐지 및 차지백 자동화',
        description:
          '국내/해외 간편결제 API 연동으로 거래 상태 불일치 문제를 탐지하고 데이터 보정을 자동화.',
        achievements: [
          '위챗페이·카카오페이·스마일페이·토스페이·네이버페이 등 외부 결제사 API 연동',
          '거래 원장 비정상 거래 감지 및 내부 데이터 보정 자동화 프로세스 구현',
          '정산금액 불일치 케이스를 분류·표준화해 재발 방지 체계 수립',
          '차지백 자동화 기반을 구축해 운영팀 수작업 대응 부담 완화',
        ],
      },
      {
        title: '운영 자동화 및 백오피스 시스템 개선',
        description:
          '고객(운영팀)이 사용하는 관리자 대시보드를 자동화 및 효율화를 위해 개선을 진행하여 사용자 경험 향상',
        achievements: [
          '운영팀의 Pain Point를 주도적 개선.',
          '운영팀 백오피스 UI/UX, 기능 개선, 자동화 등 50건 이상 수행하여 업무효율 향상',
          '통계/조회 페이지 SQL 튜닝으로 성능 75% 개선(15,000ms → 2,000ms).',
          '반복 업무 자동화로 운영팀 주당 4시간 이상 절감',
          '모니터링 알림 중요도 분리 및 이중화로 장애 인지/전파 시간 단축',
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
      'Apache Spark와 Delta Lake를 활용한 메달리온 아키텍처(Bronze/Silver/Gold) 기반의 개인 금융 데이터 분석 플랫폼 구축.',
    achievements: [
      'Raw 데이터부터 분석용 마트까지 이어지는 Medallion Architecture 전체 파이프라인 구현',
      'Star Schema 설계를 통한 고성능 분석 환경 구축 (Fact/Dim 테이블 구조화)',
      'Delta Lake 도입으로 데이터 일관성(ACID) 보장 및 Time Travel 기능 활용',
      'Spark Partitioning 및 Caching 전략을 통한 데이터 처리 성능 최적화',
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
      '광고 CTR 지표를 실시간으로 계산·서빙하는 스트리밍 파이프라인 설계 및 구현. Kafka-Flink 기반 이벤트 시간 처리, 상태 관리, 윈도우 집계 구성.',
    achievements: [
      'Out-of-Order 이벤트 문제를 워터마크 기반으로 해결하여 집계 정확도 확보',
      'Redis(실시간 API), ClickHouse(분석), DuckDB(검증) 멀티 싱크 구조 설계',
      '고처리량 환경에서 Backpressure 및 파티션 skew 대응 전략 적용',
      '대용량 트래픽 환경에서 안정적인 데이터 처리를 위한 지속적인 성능 개선'
    ],
    links: [
      {
        label: '코드 저장소',
        href: 'https://github.com/dev-wooyeon/ctr-pipeline',
        external: true,
      },
      {
        label: '시스템 구축기',
        href: '/blog/ctr-pipeline',
        external: true,
      },
      {
        label: '성능개선기',
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
    organization: '커뮤니티',
    title: '신입/주니어 개발자 고민상담소 운영',
    period: '2023.12 - 진행 중',
    description: [
      '신입 및 주니어 개발자의 실무 고민 상담과 커리어 방향성 코칭 진행',
      '문제 해결 과정과 학습 전략을 구조화해 재현 가능한 성장 방법론 공유',
    ],
  },
  {
    organization: '인프런',
    title: '멘토링 활동',
    period: '2025.02 - 2025.12',
    description: [
      '누적 100회 이상의 개발자 커리어 멘토링 진행',
      '취업준비생 및 주니어 개발자들의 이력서 및 포트폴리오 첨삭을 통한 서류 합격률 개선 지원',
      '기술적 문제 해결(Troubleshooting) 및 학습 방향성에 대한 객관적 조언 제공',
      "'함께 성장하는 가치'를 바탕으로 지식 공유 생태계 기여",
    ],
  },
  {
    organization: 'Grow-up',
    title: '그룹 스터디 리딩',
    period: '2022.12 - 2024.12',
    description: [
      '지속 가능한 학습 루틴을 위한 개발 스터디 운영 및 리딩',
      '누적 참가자 20명 이상 기술 주제 발제, 토론, 실습 중심 학습 문화 조성',
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
