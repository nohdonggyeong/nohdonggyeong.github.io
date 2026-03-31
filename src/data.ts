export const profile = {
  name: "노동경",
};

export type ProjectColor = "accent" | "purple" | "red" | "amber" | "blue" | "green"

export type Project = {
  id: string
  kind: "main" | "side"
  name: string
  org: string
  period: string
  summary: string | string[]
  detail: string | string[]
  contributions: string | string[]
  tags: string[]
  color: ProjectColor
  previewImage: string
  galleryImages?: string[]
  architectureImage?: string
  video?: string
  demoUrl?: string
}

export const mainProjects: Project[] = [
  {
    id: "fabrix",
    kind: "main",
    name: "삼성SDS - FabriX 개발 프로젝트",
    org: "에스코어",
    period: "2025.01. - 2025.12.",
    summary: ["AI 에이전트 플랫폼 스토어 서비스 백엔드 구축", "에이전트 스토어 REST API 설계·구현"],
    detail: ["삼성SDS AI 풀스택 오퍼링 중 AI 플랫폼(FabriX) 내 에이전트 스토어 도메인의 서비스 개발·운영 고도화 과제"],
    contributions: [
      "FastAPI + SQLAlchemy ORM 기반 에이전트 스토어 도메인 REST API 설계·구현 및 PostgreSQL 스키마 관리",
      "Helm Chart 구성 및 ArgoCD GitOps 파이프라인 연동으로 Kubernetes 배포 환경 구성·운영",
      "Jenkins CI 파이프라인 유지보수 및 서비스 운영 장애 대응",
      "[키워드·벡터 결합 하이브리드 검색 구조 적용 검토 및 성능 비교 분석, 관련 기고](https://s-core.co.kr/insight/view/%EB%8D%94-%EC%A0%95%ED%99%95%ED%95%98%EA%B3%A0-%EC%9C%A0%EC%97%B0%ED%95%98%EA%B2%8C-%EC%B0%BE%EB%8A%94-%ED%95%98%EC%9D%B4%EB%B8%8C%EB%A6%AC%EB%93%9C-%EA%B2%80%EC%83%89-llm%EC%9D%98-%ED%99%95/)",
    ],
    tags: ["FastAPI", "Python", "SQLAlchemy", "PostgreSQL", "Kubernetes", "ArgoCD", "Jenkins", "Helm"],
    color: "accent",
    previewImage: "/images/joined-project/fabrixv2_01.png",
    galleryImages: ["/images/joined-project/fabrixv2_01.png", "/images/joined-project/fabrixv2_03.png"],
    architectureImage: "/images/joined-project/fabrixv2_02.png",
  },
  {
    id: "gravix",
    kind: "main",
    name: "삼성SDS - GraviX 개발 프로젝트",
    org: "에스코어",
    period: "2023.04. - 2024.12.",
    summary: ["멀티 테넌트 카탈로그 서비스 백엔드 설계·구현", "카탈로그 REST API 구현 및 DB 마이그레이션 관리"],
    detail: ["(현, FabriX) 기업 내 데이터·소프트웨어·애플리케이션 자산의 통합 관리와 탐색 효율 개선을 목표로 한 카탈로그 플랫폼 개발 과제"],
    contributions: [
      "Spring Boot + JPA/QueryDSL로 멀티 테넌트 카탈로그 도메인 REST API 구현, Flyway 기반 DB 마이그레이션 관리",
      "Elasticsearch 인덱스 설계 및 검색 쿼리 튜닝으로 카탈로그 탐색 성능 개선",
      "SonarQube 정적 분석 기반 코드 품질 개선, BurpSuite 활용 보안 취약점 점검 대응",
      "Pinpoint APM 기반 서비스 성능 모니터링, Jenkins CI/CD + Helm Chart로 Kubernetes 배포 운영",
    ],
    tags: ["Java", "Spring Boot", "JPA", "QueryDSL", "PostgreSQL", "Elasticsearch", "Kubernetes", "Jenkins", "Helm", "Maven", "Flyway", "Pinpoint", "SonarQube", "BurpSuite", "Python"],
    color: "accent",
    previewImage: "/images/joined-project/fabrix2.png",
    galleryImages: ["/images/joined-project/fabrix2.png", "/images/joined-project/fabrix3.png"],
    architectureImage: "/images/joined-project/fabrix4.png",
  },
  {
    id: "nia-2022-error-correction",
    kind: "main",
    name: "NIA - 2022 AI 학습용 데이터 구축 지원사업",
    org: "솔트룩스이노베이션",
    period: "2022.06. - 2022.12.",
    summary: ["자판·음성 I/F 오류 교정 데이터 수집 플랫폼 구축", "관리자·검수 워크플로 REST API 구현"],
    detail: ["PC/모바일 입력 환경에서 발생하는 오타 문장 수집 및 품질 검수를 위한 저작·관리 도구 개발 과제"],
    contributions: [
      "Spring Boot + MyBatis로 관리자 및 검수 워크플로 REST API 구현, Cubrid DB 연동 쿼리 작성",
      "Vue.js SPA로 데이터 집계·통계 관리자 대시보드 및 검수 화면 구현",
      "Maven 빌드·Jenkins 배포 파이프라인 구성 및 운영 단계 유지보수",
    ],
    tags: ["Java", "Spring Boot", "MyBatis", "Cubrid", "Vue.js", "Maven", "Jenkins"],
    color: "accent",
    previewImage: "/images/joined-project/errorcorrection3.png",
    galleryImages: ["/images/joined-project/errorcorrection3.png", "/images/joined-project/errorcorrection2.png"],
    architectureImage: "/images/joined-project/errorcorrection4.png",
  },
  {
    id: "aica-2021-prototype",
    kind: "main",
    name: "AICA - 2021 AI (시)제품 제작 지원사업",
    org: "솔트룩스이노베이션",
    period: "2021.09. - 2021.12.",
    summary: ["비대면 크라우드소싱 서비스 플랫폼 구축", "회원·비용 항목 관리자 화면 구현"],
    detail: ["회원, 데이터, 저작도구, AI 모델, 비용 항목을 통합 관리하는 크라우드소싱 플랫폼 개발 과제"],
    contributions: [
      "eGovFramework + Thymeleaf 기반 관리자 화면 구현 (회원 조회·승인, 비용 항목 CRUD)",
      "MariaDB 스키마 설계 및 iBatis SQL 쿼리 작성, Docker-compose 기반 개발 환경 구성",
    ],
    tags: ["Java", "eGovFramework", "Thymeleaf", "MariaDB", "Apache Tomcat", "Docker-compose"],
    color: "accent",
    previewImage: "/images/joined-project/prototype21_1.PNG",
    galleryImages: ["/images/joined-project/prototype21_1.PNG", "/images/joined-project/prototype21_2.JPG"],
    architectureImage: "/images/joined-project/prototype21_3.png",
  },
  {
    id: "nia-2021-vehicle",
    kind: "main",
    name: "NIA - 2021 AI 학습용 데이터 구축 지원사업",
    org: "솔트룩스이노베이션",
    period: "2021.05. - 2021.12.",
    summary: ["차량 내·외부 상황 인식 데이터 수집 플랫폼 구축", "영상 업로드·저장·조회 백엔드 API 구현"],
    detail: ["운전자 제스처 인식 모델 학습을 위한 영상 데이터 수집·저작·검수 체계 구축 과제"],
    contributions: [
      "Django REST API로 영상 파일 업로드·저장·조회 백엔드 구현, MariaDB 스키마 설계",
      "MediaPipe Hands 연동 제스처 인식 데이터 저작·검수 워크플로 구현",
      "Vanilla JS로 영상 프레임 탐색·구간 선택·라벨링 인터페이스 구현",
      "Nginx + Gunicorn + Docker-compose 기반 배포 환경 구성 및 운영 유지보수",
    ],
    tags: ["Python", "Django", "Javascript", "MariaDB", "MediaPipe Hands", "Nginx", "Gunicorn", "Docker-compose"],
    color: "accent",
    previewImage: "/images/joined-project/vehicle5.png",
    galleryImages: ["/images/joined-project/vehicle5.png", "/images/joined-project/vehicle3.png"],
    architectureImage: "/images/joined-project/vehicle6.png",
  },
  {
    id: "aica-2020-digital-human",
    kind: "main",
    name: "AICA - 2020 AI (시)제품 제작 지원사업",
    org: "솔트룩스이노베이션",
    period: "2020.09. - 2020.12.",
    summary: ["심층 질의응답 기반 디지털 휴먼 서비스 개발", "Tacotron2 파인튜닝으로 음성 합성 품질 고도화"],
    detail: ["STT·TTS·NLP·객체 인식 모델을 연계한 디지털 휴먼 대화 서비스 개발 과제"],
    contributions: [
      "Tacotron2 모델 파인튜닝 및 추론 파이프라인 개선으로 음성 합성 품질 고도화",
      "Python 스크립트로 음성 파일 구간 분할·노이즈 처리·포맷 변환 자동화 모듈 구현",
      "STT·NLP·TTS·객체 인식 모델 연계 디지털 휴먼 서비스 운영 및 CentOS/Ubuntu 서버 관리",
    ],
    tags: ["Python", "TTS(Tacotron2)", "STT", "CentOS", "Ubuntu"],
    color: "accent",
    previewImage: "/images/joined-project/prototype20_4.jpg",
    galleryImages: ["/images/joined-project/prototype20_4.jpg"],
    architectureImage: "/images/joined-project/prototype20_3.png",
  },
  {
    id: "nia-2020-clinomics",
    kind: "main",
    name: "NIA - 2020 AI 학습용 데이터 구축 지원사업",
    org: "솔트룩스이노베이션",
    period: "2020.09. - 2020.12.",
    summary: ["폐암 예후 예측 AI 데이터 수집 플랫폼 개발", "의료 영상 로드·드래그·확대·회전 인터랙션 구현"],
    detail: ["PET/CT 영상과 임상·유전자 정보를 기반으로 한 예후 예측 모델 학습 데이터 수집·관리 도구 구축 과제"],
    contributions: [
      "Vanilla JS + Canvas API로 PET/CT 의료 영상 로드·드래그·확대·축소·회전 인터랙션 구현",
      "영역 선택 기반 라벨링 인터페이스 및 Django REST API 연동 어노테이션 저장 처리 구현",
      "PostgreSQL 스키마 설계, Nginx + Gunicorn + Docker-compose 배포 환경 구성",
    ],
    tags: ["Python", "Django", "Javascript", "PostgreSQL", "Nginx", "Gunicorn", "Docker-compose"],
    color: "accent",
    previewImage: "/images/joined-project/clinomics2.PNG",
    galleryImages: ["/images/joined-project/clinomics2.PNG", "/images/joined-project/clinomics3.PNG"],
    architectureImage: "/images/joined-project/clinomics1.png",
  },
]

export const sideProjects: Project[] = [
  {
    id: "theranote-agent",
    kind: "side",
    name: "물리치료 기록 관리 Vertical Agent PoC",
    org: "개인",
    period: "2026.02. - 2026.02.",
    summary: ["물리치료 기록 조회·요약·제안 AI 코파일럿 개발"],
    detail: ["물리치료사가 매 치료마다 반복되는 이전 기록 확인·처방 파악·기록 작성 과정을 자연어 질의로 대체하는 클리닉 특화 AI 코파일럿 개발"],
    contributions: [
      "LangGraph 3-노드 파이프라인(Orchestrator → Data Fetcher → Responder) 설계 및 17종 인텐트 분류 체계 구현",
      "FastMCP 기반 Tool Server 구현. 치료 항목 설명 등 6개 도구를 Python 함수 직접 호출과 stdio MCP 서버 독립 실행 양방향 지원",
      "인메모리 세션 스토어로 최근 6턴 대화 히스토리 및 선택 환자·날짜 컨텍스트 유지",
      "화면 우측 슬라이딩 패널 UI 구현. 현재 선택 환자·페이지 정보를 자동 주입하여 컨텍스트 기반 응답 생성"
  ],
    tags: [
      "React", "Vite", "React Router", "Tailwind CSS", "Supabase", "FastAPI", "LangGraph", "FastMCP", "OpenAI(GPT-4o-mini)"
    ],
    color: "accent",
    previewImage: "/images/side-project/agent_sideproject2.png",
    galleryImages: ["/images/side-project/agent_sideproject2.png", "/images/side-project/agent_sideproject.png"],
    video: "/videos/agent_sideproject.mp4",
  },
  {
    id: "voice-collector",
    kind: "side",
    name: "TTS 학습용 음성데이터 수집 도구",
    org: "개인",
    period: "2022.12. - 2023.01.",
    summary: ["권한 분리 기반 음성 수집·검수 라벨링 도구 개발"],
    detail: ["TTS 모델 학습 데이터 확보를 위한 크라우드형 음성 수집·검수 서비스 개발"],
    contributions: [
      "Spring Boot + JPA로 대본 등록·배정·녹음 제출·검수 워크플로 REST API 구현",
      "Spring Security로 관리자·수집자·검수자 역할 기반 접근 제어 및 인증·인가 처리",
      "FFMPEG 연동으로 업로드 음성 파일 포맷 변환·품질 검증 자동화 모듈 구현",
      "Thymeleaf + JavaScript로 녹음·검수 화면 구현, Docker-compose 배포 환경 구성",
    ],
    tags: ["Docker-compose", "Spring Boot", "JPA", "MariaDB", "Spring Security", "Thymeleaf", "Javascript", "FFMPEG"],
    color: "accent",
    previewImage: "/images/side-project/voicecollector1.PNG",
    galleryImages: ["/images/side-project/voicecollector1.PNG", "/images/side-project/voicecollector3.PNG"],
    video: "/videos/voicecollector.mp4",
  },
  {
    id: "nicework-hr-platform",
    kind: "side",
    name: "팀 HR관리 그룹웨어 플랫폼",
    org: "개인",
    period: "2022.01. - 2022.02.",
    summary: ["계약직 인력 대상 연장근로·연차 그룹웨어 개발"],
    detail: ["엑셀 중심 HR 관리 업무를 웹 기반 프로세스로 전환하기 위한 팀 단위 운영 플랫폼 개발"],
    contributions: [
      "Django ORM으로 일일 업무 기록·연장근로·휴가 신청 CRUD 및 관리자 승인 워크플로 API 구현",
      "Django 세션 기반 인증·인가 및 팀/역할별 접근 권한 제어 구현",
      "캘린더 뷰 기반 팀원 일정·휴가 조회 화면 및 근태 데이터 Excel 다운로드 기능 구현",
      "Nginx + Gunicorn + Docker-compose 기반 배포 환경 구성",
    ],
    tags: ["Docker-compose", "Django", "Nginx", "Gunicorn", "PostgreSQL"],
    color: "accent",
    previewImage: "/images/side-project/nicework.png",
    galleryImages: ["/images/side-project/nicework.png", "/images/side-project/nicework2.png"],
    video: "/videos/nicework.mp4",
  },
  {
    id: "recreation-quiz",
    kind: "side",
    name: "레크레이션 인물 퀴즈 앱",
    org: "개인",
    period: "2021.09. - 2021.10.",
    summary: ["통합 워크샵 운영용 인물 퀴즈 애플리케이션 개발"],
    detail: ["사내 워크샵 레크레이션 진행을 위한 참여형 퀴즈 앱 제작"],
    contributions: [
      "PyQt5로 슬라이드쇼형 힌트 공개·정답 입력·점수 집계 GUI 화면 구현",
      "PyInstaller로 의존성 포함 단일 실행 파일(exe) 패키징 및 배포 패키지 제작",
    ],
    tags: ["Python", "PyQt", "PyInstaller"],
    color: "accent",
    previewImage: "/images/side-project/recreation1.png",
    galleryImages: ["/images/side-project/recreation1.png", "/images/side-project/recreation2.png"],
    video: "/videos/recreation.mp4",
  },
  {
    id: "equipment-management",
    kind: "side",
    name: "회사 장비 관리 플랫폼",
    org: "개인",
    period: "2021.06. - 2021.07.",
    summary: ["사내 장비 수량·사용 현황 관리 서비스 개발"],
    detail: ["엑셀 기반 장비 관리의 동기화 한계를 해소하기 위한 웹 기반 관리 서비스 구축"],
    contributions: [
      "Django ORM + MariaDB로 장비 자산 등록·수정·삭제·조회 CRUD 및 사용자별 대여 현황 API 구현",
      "Django Admin 커스터마이징으로 장비 현황 관리 화면 구성",
      "Nginx + Gunicorn + Docker-compose 기반 배포 환경 구성",
    ],
    tags: ["Docker-compose", "Django", "Nginx", "Gunicorn", "MariaDB"],
    color: "accent",
    previewImage: "/images/side-project/eqpmngt1.PNG",
    galleryImages: ["/images/side-project/eqpmngt1.PNG", "/images/side-project/eqpmngt2.png"],
    video: "/videos/eqpmngt.mp4",
  },
  {
    id: "say-list",
    kind: "side",
    name: "Say List",
    org: "개인",
    period: "2020.05. - 2020.06.",
    summary: ["Google STT 기반 일정·메모 안드로이드 앱 개발"],
    detail: ["음성 입력을 통해 일정 및 메모를 등록·관리할 수 있는 모바일 애플리케이션 개발"],
    contributions: [
      "Android SpeechRecognizer API로 음성 입력 실시간 텍스트 변환 및 일정·메모 등록 연동 구현",
      "SQLite로 일정·메모 데이터 로컬 CRUD 관리 및 RecyclerView 기반 목록 UI 구현",
    ],
    tags: ["Android", "Google STT", "SQLite"],
    color: "accent",
    previewImage: "/images/side-project/sayList.jpg",
    galleryImages: ["/images/side-project/sayList.jpg", "/images/side-project/voiceMemo.jpg"],
    video: "/videos/saylist.mp4",
  },
  {
    id: "first-web-portfolio",
    kind: "side",
    name: "My First Web Portfolio",
    org: "개인",
    period: "2020.06. - 2020.06.",
    summary: ["IT 직무 지원용 개인 웹 포트폴리오 구축"],
    detail: ["초기 커리어 역량과 프로젝트 경험을 구조화해 제시하는 정적 웹 포트폴리오 제작"],
    contributions: [
      "HTML/CSS로 반응형 레이아웃 설계 및 섹션별 포트폴리오 페이지 구조 구현",
      "Vanilla JS로 스크롤 이벤트 기반 섹션 전환 애니메이션 및 인터랙션 구현",
    ],
    tags: ["HTML", "CSS", "Javascript"],
    color: "accent",
    previewImage: "/images/side-project/portfolio_ver1_img.PNG",
    galleryImages: ["/images/side-project/portfolio_ver1_img.PNG"],
    demoUrl: "/portfolio_ver1.html",
  },
]
