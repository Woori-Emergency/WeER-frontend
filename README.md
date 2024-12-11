# WeER

배포 주소 : https://www.woorifisa3-weer.com
전체 깃허브 주소 : https://github.com/Woori-Emergency

## 프로젝트 소개

최근 ‘응급실 뺑뺑이’ 문제로 인해 생명이 위급한 중증 환자들이 적절한 치료를 받지 못하는 상황이 빈번하게 발생하고 있습니다. 이를 해결하고자, ‘WeER’ 프로젝트는 실시간 응급실 병상 정보를 제공하는 고가용성 클라우드 시스템을 구축하여 긴급 상황에서 신속한 병상 확보를 지원하는 것을 목표로 합니다.

‘WeER’는 클라우드 기반의 하이브리드 워크로드 환경을 도입하여, 사용자 접속이 급증하는 상황에서도 안정적인 서비스 제공이 가능하도록 설계되었습니다. 또한, 멀티 클라우드 DR(재해 복구) 환경을 구축하여 클라우드 전반의 중단 사태에도 대비하고자 합니다. 이는 최근 Microsoft 클라우드의 전체 다운타임과 같은 사고에 대응하기 위해 AWS와 GCP를 함께 사용하는 멀티 클라우드 환경을 통해 중단 없는 서비스 제공을 목표로 하고 있습니다.

‘WeER’는 시간대별로 변동하는 사용자 수요에 따라 유연한 확장과 축소가 가능하며, 이를 통해 응급 상황에서 환자들이 신속하게 적절한 병상에 배정되어 치료를 받을 수 있도록 하여 응급 의료 시스템의 효율성을 높이는 데 기여할 것입니다.

본 프로젝트의 프론트엔드는 긴급 상황에서의 정보 가독성 향상에 중점을 두었습니다. 기존 상황 종합판의 정보 과잉 문제를 해결하고자, 사용자 중심의 UI/UX 개선을 진행했습니다. 특히 긴박한 순간에도 필요한 정보를 즉각적으로 파악할 수 있도록 직관적인 인터페이스를 구현했으며, 이를 통해 의사결정 속도와 업무 효율성을 향상시킬 수 있을 것으로 판단됩니다.

## 팀 소개

| 이름 | 역할 | 담당 업무 |
|------|------|-----------|
| 손대현 | ... | ... |
| 이석철 | ... | ... |
| 이아영 | ... | ... |
| 박정주 | ... | ... |
| 박웅빈 | ... | ... |

## 기술 스택

### Environment
- Node.js 
- npm

### Config
- ESLint

### Development
- React
- React Router
- Styled Components
- JavaScript
- Fetch API

### Communication
- GitHub
- Slack
- Notion

## 페이지 구성

```
📦 pages
 ┣ 📂 admin
 ┃ ┣ 📜 AdminApprovalPage.jsx
 ┃ ┣ 📜 AdminDashboardPage.jsx
 ┃ ┗ 📜 AdminUserListPage.jsx
 ┣ 📂 auth
 ┃ ┣ 📜 LoginPage.jsx
 ┃ ┣ 📜 SignupCompletePage.jsx
 ┃ ┗ 📜 SignupPage.jsx
 ┣ 📂 hospital_admin
 ┃ ┗ 📜 HospitalBookingListPage.jsx
 ┗ 📂 weer
 ┃ ┣ 📜 HospitalAnnouncementPage.jsx
 ┃ ┣ 📜 HospitalFilterPage.jsx
 ┃ ┣ 📜 HospitalFilteredList.jsx
 ┃ ┣ 📜 HospitalListPage.jsx
 ┃ ┣ 📜 MainPage.jsx
 ┃ ┣ 📜 PatientStatusInputPage.jsx
 ┃ ┣ 📜 PatientStatusListPage.jsx
 ┃ ┗ 📜 ReservationListPage.jsx
```

## 주요 기능

### 1. 사용자 인증

### 2. 응급실 거리순 조회

### 3. 응급실 필터링 조회

### 4. 환자 정보 입력 페이지

### 5. 환자 내역 페이지

### 6. 응급실 예약 조회 페이지

### 7. 관리자 대시보드 페이지 

### 8. 병원 측 승인/반려 페이지 