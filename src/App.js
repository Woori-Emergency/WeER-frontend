import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/common/Header';
import AdminHeader from './components/common/AdminHeader';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/routes/AdminRoute';

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
        </Routes>
      </Content>

      <Footer />
    </Container>
  );
}

export default App;