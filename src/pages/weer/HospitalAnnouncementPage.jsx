import React, { useState, useEffect } from 'react';
import HospitalAnnouncement from '../../components/HospitalAnnouncement/HospitalAnnouncement';
import { 
  PageHeader, 
  HospitalHeader,
  HospitalTitle, 
  RefreshIcon
} from '../../components/HospitalAnnouncement/HospitalAnnouncement.styles';
import { ContentWrapper } from '../../styles/CommonStyles';

const HospitalAnnouncementPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const mockData = [
          {
            key: '1',
            messageType: '응급메시지',
            department: '응급실',
            content: '*의료진 복족으로 119 내원시 모든 환자 수용 여부 확인 후 내원',
            timestamp: '2024-10-29 09:00:00'
          },
          {
            key: '2',
            messageType: '응급메시지',
            department: '응급실',
            content: '[피부과/안과] 평일(08:00~17:00), 토요일(08:00~12:00)에만 진료 가능',
            timestamp: '2024-10-29 09:00:00'
          },
          {
            key: '3',
            messageType: '응급메시지',
            department: '응급실',
            content: '[상부위장/소아청소년과/이비인후과/정신건강의학과] 평일 주간(08:00~17:00)에만 진료 가능',
            timestamp: '2024-10-29 09:00:00'
          },
          {
            key: '4',
            messageType: '응급메시지',
            department: '응급실',
            content: 'White',
            timestamp: '2024-10-29 09:00:00'
          },
          {
            key: '5',
            messageType: '진료불가 메시지',
            department: '안과적 응급 수술',
            content: '진료 불가',
            timestamp: '2024-10-29 09:00:00'
          },
          {
            key: '6',
            messageType: '진료불가 메시지',
            department: '수족지접합 외',
            content: '진료 불가',
            timestamp: '2024-10-29 09:00:00'
          },
          {
            key: '7',
            messageType: '진료불가 메시지',
            department: '수족지접합',
            content: '진료 불가',
            timestamp: '2024-10-29 09:00:00'
          }
        ];

        setData(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching announcements:', error);
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleGoBack = () =>{
    window.history.back();
  }

  return (

    <ContentWrapper>
          <HospitalHeader>
        <HospitalTitle>
        성심의료재단강동성심병원 <RefreshIcon onClick={handleGoBack}></RefreshIcon>
        </HospitalTitle>
        <PageHeader>
          최신정보 : {getCurrentDateTime()} | 응급실/진료불가능 메시지
        </PageHeader>
      </HospitalHeader>
      <HospitalAnnouncement 
        data={data} 
        loading={loading}
      />
    </ContentWrapper>
  );
};

export default HospitalAnnouncementPage;