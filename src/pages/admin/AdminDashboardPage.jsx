import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 20px;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

const StatBox = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StatTitle = styled.h2`
  font-size: 16px;
  color: #333;
`;

const StatValue = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
`;

function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    recentSignups: 0,
    pendingRequests: 0
  });

  // 대시보드 데이터 가져오기
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/user/dashboard`)
      .then(response => response.json())
      .then(data => setStats({
        totalUsers: data.totalUsers,
        recentSignups: data.recentSignups,
        pendingRequests: data.pendingRequests
      }))
      .catch(error => console.error("Error fetching dashboard data:", error));
  }, []);

  return (
    <PageContainer>
      <DashboardContainer>
        <StatBox>
          <StatTitle>총 회원 수</StatTitle>
          <StatValue>{stats.totalUsers}</StatValue>
        </StatBox>
        <StatBox>
          <StatTitle>최근 가입자 수</StatTitle>
          <StatValue>{stats.recentSignups}</StatValue>
        </StatBox>
        <StatBox>
          <StatTitle>승인 대기 요청</StatTitle>
          <StatValue>{stats.pendingRequests}</StatValue>
        </StatBox>
      </DashboardContainer>
    </PageContainer>
  );
}

export default AdminDashboardPage;