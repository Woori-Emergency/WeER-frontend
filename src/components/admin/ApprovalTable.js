// src/components/admin/ApprovalTable.js
import React, { useState } from 'react';
import { Table, Button, message } from 'antd';
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

  const handleApproval = async (userId, approve) => {
    const index = data.findIndex((user) => user.key === userId);
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    try {
      // 서버에 승인 또는 반려 요청
      const response = await fetch(`http://localhost:8080/user/approve-signup/${userId}?approve=${approve}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to update status');

      message.success(`User has been ${approve ? 'approved' : 'rejected'}`);
      onStatusChange(userId, approve ? '승인됨' : '반려됨');
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
            style={{
              backgroundColor: '#E97132', // 버튼 배경 색상 설정
              borderColor: '#E97132', // 버튼 테두리 색상 설정
            }}
          >
            승인
          </Button>
          <Button
            type="default"
            danger
            loading={loadings[record.key]}
            onClick={() => handleApproval(record.key, false)}
            style={{
              color: '#E97132', // 텍스트 색상
              borderColor: '#E97132', // 버튼 테두리 색상
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