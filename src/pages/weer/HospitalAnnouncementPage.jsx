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
  const [hospitalName, setHospitalName] = useState('');

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

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <ContentWrapper>
      <HospitalHeader>
        <HospitalTitle>
          {hospitalName || '병원 정보'} <RefreshIcon onClick={handleGoBack} />
        </HospitalTitle>
        <PageHeader>
          최신정보 : {getCurrentDateTime()} | 응급실/진료불가능 메시지
        </PageHeader>
      </HospitalHeader>
      <HospitalAnnouncement 
        setHospitalName={setHospitalName}
      />
    </ContentWrapper>
  );
};

export default HospitalAnnouncementPage;