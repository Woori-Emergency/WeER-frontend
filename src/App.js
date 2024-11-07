import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';

// 페이지 컴포넌트
import HomePage from './pages/weer/MainPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import SignupCompletePage from './pages/auth/SignupCompletePage';
import HospitalListPage from './pages/weer/HospitalListPage';
import HospitalFilterPage from './pages/weer/HospitalFilterPage';
import PatientStatusInputPage from './pages/weer/PatientStatusInputPage';
import PatientStatusListPage from './pages/weer/PatientStatusListPage';
import HospitalNoticePage from './pages/weer/HospitalAnnouncementPage';
import MyBookingRequestsPage from './pages/weer/ReservationListPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUserListPage from './pages/admin/AdminUserListPage';
import AdminApprovalPage from './pages/admin/AdminApprovalPage';
import HospitalBookingListPage from './pages/hospital_admin/HospitalBookingListPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* 메인 페이지 */}
        <Route path="/" element={<HomePage />} />
        
        {/* 로그인 및 회원가입 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup-complete" element={<SignupCompletePage />} />
        
        {/* 응급실 관련 */}
        <Route path="/hospital-list" element={<HospitalListPage />} />
        <Route path="/hospital/filter" element={<HospitalFilterPage />} />
        
        {/* 환자 상태 */}
        <Route path="/patient-status-input" element={<PatientStatusInputPage />} />
        <Route path="/patient-status-list" element={<PatientStatusListPage />} />
        
        {/* 병원별 공지사항 */}
        <Route path="/hospital-notice" element={<HospitalNoticePage />} />
        
        {/* 나의 예약요청 */}
        <Route path="/booking-requests" element={<MyBookingRequestsPage />} />
        
        {/* 관리자 페이지 */}
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<AdminUserListPage />} />
        <Route path="/admin/approvals" element={<AdminApprovalPage />} />
        
        {/* 병원 페이지 */}
        <Route path="/hospital-booking-list" element={<HospitalBookingListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
