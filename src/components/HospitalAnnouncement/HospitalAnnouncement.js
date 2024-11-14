import React, { useEffect, useCallback, useState } from 'react';
import { Table, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import { CustomPagination } from './HospitalAnnouncement.styles';

const API_BASE_URL = 'http://localhost:8080';

const HospitalAnnouncement = ({ setHospitalName }) => {
  const location = useLocation();
  const { hospitalId, hospitalName } = location.state || {};
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (hospitalName) {
      setHospitalName(hospitalName);
    }
  }, [hospitalName, setHospitalName]);

  const getAuthHeaders = useCallback(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('인증 토큰이 없습니다.');
    }
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const fetchAnnouncement = useCallback(async (hospitalId) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `${API_BASE_URL}/hospital/announcement?hospitalid=${hospitalId}`,
        {
          method: 'GET',
          headers: getAuthHeaders()
        }
      );

      if (!response.ok) {
        throw new Error('서버 응답이 올바르지 않습니다.');
      }

      const data = await response.json();
      console.log('알림 데이터:', data);

      // 데이터가 있고 배열인 경우에만 처리
      if (data && data.result && Array.isArray(data.result)) {
        const formattedAnnouncements = data.result.map(item => ({
          key: item.announcementId.toString(),
          messageType: item.msgType,
          department: item.diseaseType,
          content: item.message || '',
          timestamp: formatDate(item.createdAt)
        }));
        setAnnouncements(formattedAnnouncements);
      } else {
        setAnnouncements([]);
      }
    } catch (error) {
      console.error('알림 데이터 조회 실패:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  useEffect(() => {
    if (hospitalId) {
      fetchAnnouncement(hospitalId);
    }
  }, [hospitalId, fetchAnnouncement]);

  const columns = [
    {
      title: '메시지 구분',
      dataIndex: 'messageType',
      key: 'messageType',
      width: '15%',
      align: 'center',
      render: (text) => (
        <Typography.Text style={{ 
          color: '#E97132',
          fontWeight: 'bold'
        }}>
          {text}
        </Typography.Text>
      )
    },
    {
      title: '구분',
      dataIndex: 'department',
      key: 'department',
      width: '15%',
      align: 'center'
    },
    {
      title: '메시지 내용',
      dataIndex: 'content',
      key: 'content',
      width: '50%',
      align: 'left'
    },
    {
      title: '등록일시',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: '20%',
      align: 'center'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      {error && (
        <Typography.Text type="danger" style={{ marginBottom: '16px' }}>
          {error}
        </Typography.Text>
      )}
      <CustomPagination style={{ width: '100%' }}>
        <Table
          dataSource={announcements}
          columns={columns}
          loading={loading}
          pagination={{
            position: ['bottomCenter'],
            pageSize: 10,
            showSizeChanger: false,
            showQuickJumper: false,
            style: { marginTop: 16 }
          }}
          bordered
          style={{ width: '100%' }}
          locale={{ 
            emptyText: '알림이 없습니다.',
            loading: '데이터를 불러오는 중...'
          }}
        />
      </CustomPagination>
    </div>
  );
};

export default HospitalAnnouncement;