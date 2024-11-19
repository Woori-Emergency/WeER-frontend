// src/components/admin/ApprovalTable.js
import { Button, Table, message } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

// 페이지네이션과 제목 스타일을 위한 커스텀 스타일 컴포넌트
const CustomPagination = styled.div`
  .ant-pagination-item-active a {
    color: #E97132 !important;
  }
  .ant-pagination-item-active {
    border-color: #E97132 !important;
  }
  .ant-pagination-item a {
    color: #E97132;
  }
  .ant-pagination-item:hover a {
    color: #E97132;
  }
  .ant-pagination-item:hover {
    border-color: #E97132;
  }
  .ant-pagination-prev, .ant-pagination-next {
    color: #E97132;
  }
  .ant-pagination-prev:hover .ant-pagination-item-link,
  .ant-pagination-next:hover .ant-pagination-item-link {
    color: #E97132 !important;
    border-color: #E97132 !important;
  }
`;

const ApprovalTable = ({ data, loading, onStatusChange }) => {
  const [loadings, setLoadings] = useState([]);

  // 승인 또는 반려 처리 함수
  const handleApproval = async (userId, approve) => {
    const token = localStorage.getItem('accessToken'); // access token 불러오기
    const index = data.findIndex((user) => user.key === userId);
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
  
    try {
      // 문자열 값 'APPROVED' 또는 'UNAPPROVED'를 approve 파라미터에 전달
      const approveValue = approve ? 'APPROVED' : 'UNAPPROVED';
  
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/approve-signup/${userId}?approve=${approveValue}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Authorization 헤더 추가
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) throw new Error('Failed to update status');
  
      message.success(`User has been ${approve ? 'approved' : 'rejected'}`);
      onStatusChange(userId, approve ? 'APPROVED' : 'UNAPPROVED');
    } catch (error) {
      console.error('Error updating status:', error);
      message.error('Failed to update user status');
    } finally {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }
  };

  // 테이블 컬럼 정의
  const columns = [
    {
      title: <div style={{ textAlign: 'center' }}>이름</div>,
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: <div style={{ textAlign: 'center' }}>아이디</div>,
      dataIndex: 'loginId',
      key: 'loginId',
      align: 'center',
    },
    {
      title: <div style={{ textAlign: 'center' }}>메일</div>,
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: <div style={{ textAlign: 'center' }}>기관</div>,
      dataIndex: 'organization',
      key: 'organization',
      align: 'center',
    },
    {
      title: <div style={{ textAlign: 'center' }}>자격번호</div>,
      dataIndex: 'certificate',
      key: 'certificate',
      align: 'center',
    },
    {
      title: <div style={{ textAlign: 'center' }}>요청일자</div>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
    },
    {
      title: <div style={{ textAlign: 'center' }}>상태</div>,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status, record) => (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <Button
            type="primary"
            loading={loadings[record.key]}
            onClick={() => handleApproval(record.key, true)}
            disabled={status === 'APPROVED'} // 승인된 경우 버튼 비활성화
            style={{
              backgroundColor: '#E97132',
              borderColor: '#E97132',
            }}
          >
            승인
          </Button>
          <Button
            type="default"
            danger
            loading={loadings[record.key]}
            onClick={() => handleApproval(record.key, false)}
            disabled={status === 'UNAPPROVED'} // 반려된 경우 버튼 비활성화
            style={{
              color: '#E97132',
              borderColor: '#E97132',
            }}
          >
            반려
          </Button>
        </div>
      ),
    },
  ];

  return (
    <CustomPagination>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="key"
        pagination={{
          position: ["bottomCenter"],
        }}
      />
    </CustomPagination>
  );
};

export default ApprovalTable;