import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import AdminHeader from './components/common/AdminHeader';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import ProtectedRoute from './components/routes/AdminRoute';

import AdminApprovalPage from './pages/admin/AdminApprovalPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUserListPage from './pages/admin/AdminUserListPage';
import LoginPage from './pages/auth/LoginPage';
import SignupCompletePage from './pages/auth/SignupCompletePage';
import SignupPage from './pages/auth/SignupPage';
import HospitalBookingListPage from './pages/hospital_admin/HospitalBookingListPage';
import HospitalNoticePage from './pages/weer/HospitalAnnouncementPage';
import HospitalFilterPage from './pages/weer/HospitalFilterPage';
import HospitalFilteredList from './pages/weer/HospitalFilteredList';
import HospitalListPage from './pages/weer/HospitalListPage';
import MainPage from './pages/weer/MainPage';
import PatientStatusInputPage from './pages/weer/PatientStatusInputPage';
import PatientStatusListPage from './pages/weer/PatientStatusListPage';
import ReservationListPage from './pages/weer/ReservationListPage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
`;

function App() {
  const location = useLocation();

  const hideHeaderRoutes = ['/login', '/signup', '/signup-complete'];
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/hospital-admin');
  const showHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <Container>
      {showHeader && (isAdminRoute ? <AdminHeader /> : <Header />)}

      <Content>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signup-complete" element={<SignupCompletePage />} />
          <Route path="/hospital-list" element={<HospitalListPage />} />
          <Route path="/hospital/filter" element={<HospitalFilterPage />} />
          <Route path="/hospital-filterd-list" element={<HospitalFilteredList />} />
          <Route path="/patient-status-input" element={<PatientStatusInputPage />} />
          <Route path="/patient-status-list" element={<PatientStatusListPage />} />
          <Route path="/hospital-notice" element={<HospitalNoticePage />} />
          <Route path="/my-booking-requests" element={<ReservationListPage />} />

          <Route element={<ProtectedRoute allowedRoles="ADMIN" />}>
            <Route path="/admin" element={<AdminUserListPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/users" element={<AdminUserListPage />} />
            <Route path="/admin/approvals" element={<AdminApprovalPage />} />
          </Route>

          <Route path="/hospital-booking-list" element={<HospitalBookingListPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Content>

      <Footer />
    </Container>
  );
}

export default App;