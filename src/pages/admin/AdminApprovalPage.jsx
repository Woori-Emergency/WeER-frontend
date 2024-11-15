// AdminApprovalPage.jsx
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import styled from 'styled-components';
import ApprovalTable from '../../components/admin/ApprovalTable';

const Container = styled.div`
  padding: 20px 40px;
  margin-top: 10px;
`;

const AdminApprovalPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:8080/user/signup-request');
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        console.log('Fetched data:', result);

        // 데이터를 ApprovalTable 형식에 맞게 변환
        const formattedData = result.result.map((user) => ({
          key: user.userId,             // unique key
          name: user.name,               // 이름
          loginId: user.loginId,         // 아이디
          email: user.email,             // 메일
          organization: user.organization, // 기관
          certificate: user.certificate, // 자격번호
          createdAt: user.createdAt,     // 요청일자
          status: user.approved ? '승인됨' : '대기중', // 상태
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

  const handleApproval = async (userId, approve) => {
    try {
      const response = await fetch(`http://localhost:8080/user/approve-signup/${userId}?approved=${approve}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || 'Failed to update status');
      }

      const result = await response.json();

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