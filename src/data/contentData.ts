import { ServiceCategory } from '../types';

export const HERO_SLIDES = [
  {
    id: 1,
    badge: 'SINGAPORE GROUP TRAVEL & MICE SPECIALIST',
    title: '싱가포르 단체여행을 위한\n신뢰할 수 있는 현지 파트너',
    description: '학생단체 수학여행, MICE 프로그램, 기관·대학 선진지 견학까지\n단체의 목적과 예산에 맞는 싱가포르 현지 일정을 맞춤 설계하고 전문적으로 운영합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=2000&q=85', // Marina Bay Sands Night Skyline
    tag: 'B2B 현지 랜드사',
  },
  {
    id: 2,
    badge: 'STUDENT EDUCATIONAL TOURS',
    title: '학생단체 · 수학여행\n전문 현지 수배 & 안전 운영',
    description: '초·중·고 수학여행부터 대학생 글로벌 연수, 현지 학교 교류까지\n교육 목적과 연령에 적합한 안전하고 유익한 싱가포르 탐방 프로그램을 설계합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=2000&q=85', // Jewel Changi / Gardens
    tag: '안전 & 교육 특화',
  },
  {
    id: 3,
    badge: 'MICE & CORPORATE INCENTIVE',
    title: 'MICE · 기업 및 단체행사\n원스톱 현지 맞춤 솔루션',
    description: '기업 인센티브, 임직원 연수, 국제 컨퍼런스 및 팀빌딩 워크숍\n호텔, 식사, 고급 차량, 통역 가이드 및 특화 행사장을 통합 수배합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=2000&q=85', // Modern Singapore CBD City
    tag: '기업 MICE 전문',
  },
  {
    id: 4,
    badge: 'BENCHMARKING & INSTITUTION TOURS',
    title: '기관 · 대학 선진지 견학\n체계적인 맞춤 연수 일정',
    description: '스마트시티 벤치마킹, 교육기관 및 기업 방문, 정책·환경 연수\n단체의 분야와 목적에 맞춘 실현 가능한 최적의 동선을 구축해 드립니다.',
    imageUrl: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=2000&q=85', // Singapore Business & Architecture
    tag: '공공기관 · 대학 연수',
  },
];

export const CORE_SERVICES: ServiceCategory[] = [
  {
    id: 'student',
    code: 'A',
    title: '학생단체 · 수학여행',
    subtitle: 'Educational & School Group Tours',
    description: '초·중·고등학교와 대학생 단체를 대상으로 교육 목적과 연령에 적합한 싱가포르 체험·탐방 프로그램을 설계합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1000&q=80',
    features: [
      '초·중·고 수학여행 및 체험학습',
      '해외교육연수 & 글로벌 역량 강화',
      '대학생 글로벌 연수 및 학화 탐방',
      '진로 및 첨단 산업체 견학',
      '영어 및 싱가포르 현지 문화 체험',
      '현지 학교 및 교육기관 교류 지원',
      '역사·문화·환경·과학 테마 탐방',
      '학생단체 전담 안전관리 프로세스',
    ],
  },
  {
    id: 'mice',
    code: 'B',
    title: 'MICE · 기업 및 단체행사',
    subtitle: 'MICE & Corporate Incentive Events',
    description: '기업, 협회, 기관 및 각종 단체를 위한 회의, 포상관광, 연수, 행사 및 맞춤형 현지 프로그램을 지원합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1000&q=80',
    features: [
      '기업 임직원 인센티브 포상관광',
      '임직원 해외 연수 및 역량 개발',
      '국제 회의, 학술 세미나 및 컨퍼런스',
      '기업 워크숍 & 현지 수배',
      '맞춤형 팀빌딩 & 문화 프로그램',
      '단체 만찬, Gala Dinner & 특별행사',
      'VIP 및 주요 인사 전담 의전 서비스',
      '현지 행사장 대관 및 종합 현장 운영',
    ],
  },
  {
    id: 'institution',
    code: 'C',
    title: '기관 · 대학 선진지 견학',
    subtitle: 'Government & University Benchmarking',
    description: '공공기관, 지방자치단체, 대학 및 전문단체를 대상으로 방문 목적과 전공, 정책 분야에 맞는 견학 및 연수 프로그램을 구성합니다.',
    imageUrl: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=1000&q=80',
    features: [
      '싱가포르 주요 명문 대학 탐방 (NUS, NTU 등)',
      '교육기관 및 연구시설 방문 연수',
      '글로벌 기업 및 첨단 산업시설 견학',
      '스마트시티, 디지털 도시 벤치마킹',
      '도시계획, 주거 및 교통정책 선진지 연수',
      '친환경, 지속가능성, 과학·기술 분야 탐방',
      '스타트업, 혁신 센터 및 미래산업 탐방',
      '기관 맞춤형 전문 연수 동선 설계',
    ],
  },
];

export const CUSTOM_SERVICES = [
  {
    step: '01',
    title: '맞춤 일정 설계',
    icon: 'Compass',
    description: '정해진 패키지가 아닌, 단체의 방문 목적과 참가자 연령, 인원, 예산, 희망기관 및 항공일정을 세밀하게 분석하여 독자적인 일정을 구성합니다.',
    items: ['단체 방문 목적 정밀 분석', '참가자 연령 및 특성 반영', '최적의 현지 이동 동선 수립', '교육·연수 효과 극대화 프로그램'],
  },
  {
    step: '02',
    title: '현지 전 분야 수배',
    icon: 'Hotel',
    description: '엄선된 싱가포르 현지 인프라 네트워크를 통해 검증된 수배 서비스를 제공합니다.',
    items: ['안전하고 검증된 호텔 수배', '단체 맞춤형 식당 및 특식', '전용 대형 버스 및 차량', '베테랑 한국어 전문 가이드', '관광지 및 체험시설 사전 예약', '행사장 및 회의실 수배'],
  },
  {
    step: '03',
    title: '기관 방문 지원',
    icon: 'Building2',
    description: '대학, 교육기관, 공공기관, 기업 및 관련 시설 견학을 위한 공식 절차 및 연계 수배를 지원합니다.',
    items: ['대학 및 교육기관 견학 수배', '기업 및 첨단 산업시설 견학', '공공기관 및 선진 시설 연계', '현지 학교 간 문화 교류', '전문 분야 맞춤 견학처 서칭'],
  },
  {
    step: '04',
    title: '통합 현장 운영',
    icon: 'ShieldCheck',
    description: '싱가포르 창이공항 영접부터 전 일정 상주 현장 케어로 실시간 안전 운영을 보장합니다.',
    items: ['창이공항 샌딩 및 픽업 전담', '전 일정 밀착 현장 상황 대응', '한국 여행사 및 담당기관 상시 업무 공유', '기상 및 유동적 일정 변경 즉각 대응', '24시간 비상 네트워크 운용'],
  },
];

export const PRINCIPLES = [
  {
    id: 1,
    title: '목적에 맞는 일정 설계',
    desc: '단순한 일반 관광이 아니라 단체의 목적(교육, 연수, MICE, 벤치마킹)을 정밀 반영합니다.',
    icon: 'Target',
  },
  {
    id: 2,
    title: '현실적인 동선 구성',
    desc: '현지 교통 상황, 피로도, 식사 및 기관 방문 시간을 체계적으로 계산하여 무리 없는 동선을 구축합니다.',
    icon: 'MapPin',
  },
  {
    id: 3,
    title: '단체 특성 세밀 반영',
    desc: '초·중·고 학생, 교직원, 공공기관 임직원, 기업 VIP 등 참가자 대상별 특성에 최적화된 서비스를 제공합니다.',
    icon: 'Users',
  },
  {
    id: 4,
    title: '통합 현지 운영 체계',
    desc: '호텔, 차량, 가이드, 식당, 방문기관을 파편화하지 않고 단일 창구에서 일체형으로 관리합니다.',
    icon: 'Layers',
  },
  {
    id: 5,
    title: '투명하고 명확한 업무 소통',
    desc: '한국 여행사와 담당 기관이 현지 준비 진행 상황을 시각적으로 쉽게 투명하게 확인할 수 있도록 공유합니다.',
    icon: 'MessageSquareCheck',
  },
  {
    id: 6,
    title: '철저한 돌발상황 대응',
    desc: '교통 체증, 악천후, 기관 사정 등 예상치 못한 변수 발생 시 즉시 적용 가능한 대체안 플랜B를 즉시 가동합니다.',
    icon: 'AlertTriangle',
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: '상담 접수',
    desc: '단체 유형, 예상 인원, 기간, 목적 및 요구사항 확인',
  },
  {
    step: '02',
    title: '요구사항 분석',
    desc: '예산, 이동 동선, 희망 방문기관 및 특화 프로그램 검토',
  },
  {
    step: '03',
    title: '일정 및 견적 제안',
    desc: '맞춤 일정 초안 및 합리적인 현지 세부 비용 제안',
  },
  {
    step: '04',
    title: '수정 및 확정',
    desc: '여행사 또는 담당기관 피드백 반영 및 최종 일정 확정',
  },
  {
    step: '05',
    title: '현지 수배',
    desc: '호텔, 식사, 전용차량, 가이드 및 방문기관 정식 수배',
  },
  {
    step: '06',
    title: '현지 운영',
    desc: '공항 영접부터 일정 완료 시까지 24시간 현장 케어',
  },
  {
    step: '07',
    title: '종료 및 정산',
    desc: '운영 결과 최종 확인 및 명확한 현지 비용 정산',
  },
];

export const TARGET_PARTNERS = [
  { name: '한국 여행사', desc: 'B2B 현지 랜드사 파트너십, 수배 및 운영 전담 지원', icon: 'Plane' },
  { name: '초 · 중 · 고등학교', desc: '안전 보장 수학여행, 체험학습, 글로벌 교류 프로그램', icon: 'GraduationCap' },
  { name: '대학교 및 교육기관', desc: '글로벌 역량 강화 연수, 전공 학과 탐방, 현지 대학 교류', icon: 'School' },
  { name: '지방자치단체', desc: '스마트시티, 도시계획, 선진지 정책 벤치마킹 연수', icon: 'Building' },
  { name: '공공기관 및 협회', desc: '직무 연수, 글로벌 세미나, 전문 분야 선진지 방문', icon: 'Landmark' },
  { name: '기업체', desc: '임직원 인센티브 포상관광, 워크숍, 팀빌딩 행사', icon: 'Briefcase' },
  { name: '국제교류 운영기관', desc: '한-싱가포르 청소년 및 전문가 교류 사업 현지 수배', icon: 'Globe' },
  { name: '전문 단체', desc: '산업체 견학, 특화 학술 단체 맞춤 프로그램', icon: 'Award' },
];

export const SINGAPORE_HUBS = [
  {
    title: 'MICE & 컨퍼런스 인프라',
    desc: '마리나 베이 샌즈 엑스포, 선텍 시티 컨벤션 센터, 싱가포르 EXPO 등 세계적 MICE 시설',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
    category: 'MICE / Convention',
  },
  {
    title: '스마트시티 & 선진 인프라',
    desc: '싱가포르 도시재개발청(URA), 스마트시티 기술 통합 센터, 주얼 창이 허브',
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=800&q=80',
    category: 'Smart City & Infra',
  },
  {
    title: '글로벌 명문 대학 탐방',
    desc: '싱가포르 국립대학 (NUS), 난양공과대학 (NTU), 싱가포르 경영대학 (SMU)',
    image: 'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=800&q=80',
    category: 'University & Research',
  },
  {
    title: '지속가능한 친환경 도시',
    desc: '가든스 바이 더 베이, 수자원공사(PUB) NEWater, 친환경 건축 랜드마크',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80',
    category: 'Eco & Sustainability',
  },
];
