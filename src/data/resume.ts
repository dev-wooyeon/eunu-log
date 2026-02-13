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
  stages: ExperienceStage[];
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
      '금융 거래 데이터를 Medallion 아키텍처와 Star Schema로 정규화해, 로컬 제약 환경에서도 1억 건 이상 데이터를 일관된 품질로 분석 가능한 형태로 적재·가공.',
    stages: [
      {
        key: 'problem',
        label: '문제 정의',
        detail:
          'Spark/Delta 파이프라인의 초깃값 상태에서 100만~1억 건 규모를 염두에 둔 비용·성능 예측이 어려웠고, 중복, 스키마 누락, 카테고리/상점 이력 변경이 같은 테이블에 누적되면 분석 신뢰도가 떨어질 위험이 있음',
      },
      {
        key: 'implementation',
        label: '구현',
        detail:
          'Bronze 단계에서 원본 + 메타데이터(수집일시/소스 파일/년월 파티션)를 적재하고, Silver에서 `transaction_id` 기준 dedup·검증·상점명 정규화(`UDF`) 후 Gold로 전달하는 계층형 파이프라인 구현',
      },
      {
        key: 'decision',
        label: '의사결정',
        detail:
          '변경 이력 추적이 필요한 차원(상점)에는 SCD Type 2, 고빈도 변경이 잦은 fact는 `transaction_id` 기준 `MERGE` 기반 증분 적재를 적용해 재처리 비용을 낮추는 전략으로 Medallion+Star Schema를 고정',
      },
      {
        key: 'verification',
        label: '검증',
        detail:
          '`localCheckpoint()`를 활용한 안정화 후 Bronze/Silver/Gold 레이어에 필수 컬럼·널/중복·값 범위 검증을 수행해 품질 게이트를 통과한 데이터만 적재되도록 구성',
      },
      {
        key: 'result',
        label: '결과/사용자 이점',
        detail:
          '초기 10,000건 기준 파이프라인을 안정 운영화한 뒤 100,000,000건 실험에서 벤치마크를 확장해 `686.5초 → 35.89초 → 24.65초`로 누적 개선(Phase6/7/8/9), 단일 노드 환경에서 분석 후보군 산출 리드타임을 극적으로 단축',
      },
      {
        key: 'extension',
        label: '전환 전략',
        detail:
          '분석용 100M 벤치마크를 위해 Spark 초기화 비용·메모리 병목 구간을 먼저 분석하고, DuckDB Quantum/One-Pass DAG/압축 정책 변경을 조합해 하드웨어 floor에 맞춘 성능 파이프라인으로 단계적 전환',
      },
    ],
    links: [
      {
        label: '코드 저장소',
        href: 'https://github.com/dev-wooyeon/demo-finance-engine',
        external: true,
      },
      {
        label: '성능 도전회고',
        href: 'https://github.com/dev-wooyeon/demo-finance-engine/blob/main/docs/100m_performance_challenge.md',
        external: true,
      },
      {
        label: 'Gold 레이어 고도화 회고',
        href: 'https://github.com/dev-wooyeon/demo-finance-engine/blob/main/docs/blog_gold_layer_optimization.md',
        external: true,
      },
    ],
  },
  {
    title: '실시간 CTR 분석 파이프라인 구축',
    role: '데이터 엔지니어링',
    period: '2025.11 - 2025.12',
    description:
      '광고 impression/click 이벤트를 Flink 실시간 스트리밍에서 윈도우 집계하고, ClickHouse 단일 소스를 통해 조회·대시보드까지 이어지는 엔드투엔드 파이프라인으로 정착.',
    stages: [
      {
        key: 'problem',
        label: '문제 정의',
        detail:
          '임시 이벤트 정합성 이슈(순서 뒤섞임), 처리량 급증 구간의 지연(p99 증가), 장애 구간 발생 시 중복 집계 위험이 있어 이벤트-타임 기반 실시간 정확성 보장 방식이 필요',
      },
      {
        key: 'decision',
        label: '의사결정',
        detail:
          'Kafka source → event-time 정렬 → 윈도우 집계의 신뢰성 순서로 결정하고, 멀티 싱크 확장 대신 ClickHouse 단일 저장소로 수집·서빙·시각화를 통합',
      },
      {
        key: 'implementation',
        label: '구현',
        detail:
          'Flink 파이프라인에서 Impression/Click 토픽을 병합해 `product_id` 기준으로 10초 Tumbling Window 집계, `Watermark forBoundedOutOfOrderness(5초)` + `allowedLateness(5초)` 설정, 실패 이벤트를 DLQ 토픽으로 분리',
      },
      {
        key: 'verification',
        label: '검증',
        detail:
          'Exactly-once checkpoint 및 재시작 전략, Slot Sharing Group(source/processing/sink)로 리소스 충돌을 분리하고, Kafka DLQ와 ClickHouse 배치 쓰기(1000배치/200ms/retry3)로 운영 중복/유실/스파이크 대응성을 검증',
      },
      {
        key: 'result',
        label: '결과/사용자 이점',
        detail:
          'Kafka→Flink→ClickHouse 단일 오케스트레이션으로 중복 계층을 제거하고, ClickHouse materialized view(`ctr_ml_view`, `ctr_latest_view`)로 실시간 분석 쿼리를 바로 서빙. `ctr_results_raw` 집계와 Superset/ClickHouse SQL 기반 운영 리포팅을 즉시 가능하게 함',
      },
      {
        key: 'extension',
        label: '성능 최적화',
        detail:
          '중간 레이어 정리로 Redis/Serving API를 축소하고 ClickHouse Materialized View 중심으로 단순화, 연산자 체이닝 및 슬롯 그룹 설계로 네트워크/메모리 오버헤드 저감 기반 실성능 튜닝(네트워크 전송 최소화, 오퍼레이터 체이닝 비용 절감) 수행',
      },
    ],
    links: [
      {
        label: '코드 저장소',
        href: 'https://github.com/dev-wooyeon/demo-flink-kafka-redis-api',
        external: true,
      },
      {
        label: '설계 회고',
        href: 'https://github.com/dev-wooyeon/demo-flink-kafka-redis-api/blob/main/docs/OPERATOR_CHAINING_REPORT.md',
        external: true,
      },
      {
        label: 'Redis/serving 제외 결정 회고',
        href: 'https://github.com/dev-wooyeon/demo-flink-kafka-redis-api/blob/main/docs/WHY_REMOVE_DUCKDB.md',
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
