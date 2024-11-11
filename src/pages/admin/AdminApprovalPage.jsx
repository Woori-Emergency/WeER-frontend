// src/pages/admin/AdminApprovalPage.jsx
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import styled from 'styled-components';
import ApprovalTable from '../../components/admin/ApprovalTable';

// ApprovalTable을 감싸는 컨테이너에 여백 추가
const Container = styled.div`
  padding: 20px 40px;
  margin-top: 10px; // 헤더와의 간격
`;

const AdminApprovalPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 데이터 가져오기
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:8080/user/signup-requests');
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();

        // approved 필드를 상태에 반영하여 변환
        const formattedData = result.map((user) => ({
          key: user.userId,
          name: user.name,
          loginId: user.loginId,
          email: user.email,
          organization: user.organization,
          certificate: user.certificate,
          createdAt: user.createdAt,
          status: user.approved ? '승인됨' : '대기중', // approved에 따라 상태 표시
        }));

        setData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching signup requests:", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // 개별 사용자 승인 또는 반려 요청 처리
  const handleApproval = async (userId, approve) => {
    try {
      const response = await fetch(`http://localhost:8080/user/approve-signup/${userId}?approve=${approve}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || 'Failed to update status');
      }

      const result = await response.json();

      // approved에 따라 상태 업데이트
      setData((prevData) =>
        prevData.map((user) =>
          user.key === userId ? { ...user, status: approve ? '승인됨' : '반려됨' } : user
        )
      );
      message.success(result.message);
    } catch (error) {
      console.error('Error updating status:', error);
      message.error(error.message || 'Failed to update user status');
    }
  };

  return (
    <Container>
      <ApprovalTable
        data={data}
        loading={loading}
        onStatusChange={handleApproval}  // 승인 및 반려 처리 함수 전달
      />
    </Container>
  );
};

export default AdminApprovalPage;