import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/common/Header';

import MainPage from './pages/weer/MainPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import SignupCompletePage from './pages/auth/SignupCompletePage';
import HospitalListPage from './pages/weer/HospitalListPage';
import HospitalFilterPage from './pages/weer/HospitalFilterPage';
import PatientStatusInputPage from './pages/weer/PatientStatusInputPage';
import PatientStatusListPage from './pages/weer/PatientStatusListPage';
import HospitalNoticePage from './pages/weer/HospitalAnnouncementPage';
import ReservationListPage from './pages/weer/ReservationListPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUserListPage from './pages/admin/AdminUserListPage';
import AdminApprovalPage from './pages/admin/AdminApprovalPage';
import HospitalBookingListPage from './pages/hospital_admin/HospitalBookingListPage';

function App() {
  const location = useLocation();

  const hideHeaderRoutes = ['/single'];
  const showHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<MainPage />} />

        {/* auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup-complete" element={<SignupCompletePage />} />

        {/* weer */}
        <Route path="/hospital-list" element={<HospitalListPage />} />
        <Route path="/hospital/filter" element={<HospitalFilterPage />} />
        <Route path="/patient-status-input" element={<PatientStatusInputPage />} />
        <Route path="/patient-status-list" element={<PatientStatusListPage />} />
        <Route path="/hospital-notice" element={<HospitalNoticePage />} />
        <Route path="/my-booking-requests" element={<ReservationListPage />} />

        {/* admin */}
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/users" element={<AdminUserListPage />} />
        <Route path="/admin/approvals" element={<AdminApprovalPage />} />

        {/* 병원 관리자 페이지 */}
        <Route path="/hospital-booking-list" element={<HospitalBookingListPage />} />
      </Routes>
    </>
  );
}

export default App;
