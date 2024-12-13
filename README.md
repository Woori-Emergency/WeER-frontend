# 🚑 WeER > 응급실 가용 병상 확인 및 예약 사이트

🌐 배포 주소 : https://www.woorifisa3-weer.com
📁 전체 깃허브 주소 : https://github.com/Woori-Emergency

## 💡 프로젝트 소개

<b>'WeER'</b>는 '응급실 뺑뺑이' 문제를 해결하기 위해 실시간 응급실 병상 정보를 제공하는 웹 서비스입니다. 본 프로젝트에서 프론트엔드는 긴급 상황에서의 신속한 의사결정을 돕기 위해 정보 가독성 향상에 중점을 두었습니다. 기존 응급실 정보 시스템의 복잡한 UI를 개선하여 필수 정보를 직관적으로 파악할 수 있도록 하였으며, 실시간 필터링과 검색 기능을 통해 사용자가 원하는 조건의 병원을 빠르게 찾을 수 있습니다. 또한 병원 간 이송 예약 시스템을 구축하여 응급 상황에서의 업무 효율성 향상을 기대할 수 있습니다.

## ⚒️ 기술 스택

### 🛠️ Environment
- 📦 Node.js
- 📦 npm

### ⚙️ Config
- 🔍 ESLint

### 💻 Development
- ⚛️ React
- 🎨 Styled Components
- 🔄 Fetch API
- 📄 HTML
- 🎯 CSS
- 💫 JavaScript

### 🤝 Communication
- 🐱 GitHub
- 💬 Slack
- 📝 Notion

## 📁 페이지 구성

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

## 📱 화면 구성

| 페이지 | 스크린샷 | 구현 기능 |
|---------------------------|--------------------------|--------------------------|
| 🏠 메인 페이지 | <img src="https://github.com/user-attachments/assets/8e04f9ad-d34e-4d98-a24d-5aa860cc9e3b" width="300" alt="메인 페이지"/> | - 🗺️ 지도에 현재 가용 가능한 응급실 표시 <br>- 📍 거리순 응급실 조회<br>- 🔍 필터링순 응급실 조회<br> - 🏥 응급실 이름 검색으로 현 위치에서 거리 및 소요 시간 확인 |
| 📍 거리순 응급실 조회 페이지| <img src="https://github.com/user-attachments/assets/599e05fc-58b0-4efa-b5e8-80c31b4e227b" width="300" alt="거리순 응급실 조회"/> | - 🚶‍♂️ 현재 위치에서 가장 가까운 응급실 확인 <br>- 🔧 현재 장비 확인<br> - 📅 예약 기능 |
| 🔍 필터링별 응급실 조회 페이지| <img src="https://github.com/user-attachments/assets/348197cd-4690-41dd-9a86-9d2dc86c9ee1" width="300" alt="필터링별 응급실 조회"/> | - ⚕️ 병원 필터링 조건 제시<br>- 🏥 현재 상황에 맞는 응급실 확인 가능 |
| 👤 환자 정보 입력 페이지 | <img src="https://github.com/user-attachments/assets/ba545f3b-c18a-49c8-aa7a-9def84c9eef9" width="300" alt="환자 정보 입력"/> | - 📝 이송할 환자 상태 정보 입력 |
| 📋 환자 내역 페이지 | <img src="https://github.com/user-attachments/assets/97b329f6-da32-4f67-84f2-0195b5e1c6b3" width="300" alt="환자 내역 페이지"/> | - 🚑 현재 이송중인 환자 정보<br>- 📊 이송 완료한 환자 정보 리스트 <br>- ✅ 이송 완료 기능|
| 📅 응급실 예약 조회 페이지 | <img src="https://github.com/user-attachments/assets/dad8ff2f-ce35-4431-b319-219ca50d939f" width="300" alt="응급실 예약 조회 페이지"/> | - 🏃 현재 이송중인 환자 정보<br>- 🔖 해당 환자를 위한 응급실 예약<br>- ✔️ 예약 승인/반려 확인<br> - ✅ 이송 완료 기능 |
| 👨‍💼 관리자 대시보드 페이지 | <img src="https://github.com/user-attachments/assets/9c96b1cd-88a7-4dca-9ba8-479c37abc651" width="300" alt="관리자 대시보드"/> | - 👥 회원 정보 확인 <br>- 📝 회원가입 요청 리스트 확인 <br>- ✅ 회원가입 승인/반려 |
| 🏥 병원 측 승인/반려 페이지 | <img src="https://github.com/user-attachments/assets/8f103fcf-2f19-4223-9620-655e9e5eeb09" width="300" alt="병원 측 승인/반려 페이지"/> | - 📋 요청 들어온 예약 확인<br>- ✔️ 예약 요청 승인/반려 |