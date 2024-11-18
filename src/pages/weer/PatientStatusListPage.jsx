import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CompletedTransferStatus from '../../components/patientStatus/CompletedTransferStatus';
import PatientInfoCard from '../../components/patientStatus/PatientInfoCardList';


const ContentWrapper = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const PatientStatusListPage = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [completedTransfers, setCompletedTransfers] = useState([]);  // 완료된 이송 상태 저장
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentPatient = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("로그인이 필요합니다.");
        }

        const response = await fetch('http://localhost:8080/user/reservation', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("accessToken");
            throw new Error("로그인이 만료되었습니다. 다시 로그인해주세요.");
          }
          throw new Error('데이터를 불러오는데 실패했습니다.');
        }

        const data = await response.json();
        
        // 진행 중인 이송 건만 필터링 (필요한 경우)
        const currentTransfer = data.result.find(item => 
          item.transportStatus === 'IN_PROGRESS'
        );

        const completedTransfersList = data.result.filter(item => 
          item.transportStatus === 'COMPLETED'
        ).map(item => ({
          patientId: item.patientconditionid,
          gender: item.gender,
          ageGroup: item.ageGroup,
          bloodPressure: item.bloodPressure,
          heartRate: item.heartRate,
          temperature: item.temperature,
          respiration: item.respiration,
          medical: item.medical,
          consciousnessLevel: item.consciousnessLevel,
          transportStatus: item.transportStatus,
          startTime: item.createdAt,
          endTime: item.modifiedAt
        }));

        if (currentTransfer) {
          // PatientInfoCard 컴포넌트에 맞게 데이터 매핑
          const mappedPatient = {
            patientId: currentTransfer.patientconditionid,
            gender: currentTransfer.gender,
            ageGroup: currentTransfer.ageGroup,
            bloodPressure: currentTransfer.bloodPressure,
            heartRate: currentTransfer.heartRate,
            temperature: currentTransfer.temperature,
            respiration: currentTransfer.respiration,
            medical: currentTransfer.medical,
            consciousnessLevel: currentTransfer.consciousnessLevel,
            transportStatus: currentTransfer.transportStatus,
            startTime: currentTransfer.createdAt // formatDate 유틸 함수에서 사용
          };
          setCurrentPatient(mappedPatient);
          setCompletedTransfers(completedTransfersList);
        }
        setError(null);

      } catch (error) {
        console.error('현재 환자 데이터 조회 실패:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentPatient();
  }, []);

  const handleDistanceSort = () => {
    navigate('/hospital-list');
  };

  const handleEmergencyFilter = () => {
    navigate('/hospital/filter');
  };

  if (loading) {
    return <ContentWrapper>데이터를 불러오는 중입니다...</ContentWrapper>;
  }

  if (error) {
    return <ContentWrapper>에러: {error}</ContentWrapper>;
  }

  if (!currentPatient) {
    return <ContentWrapper>현재 진행 중인 이송이 없습니다.</ContentWrapper>;
  }

  return (
    <ContentWrapper>
      <PatientInfoCard 
        patient={currentPatient} 
        isCompleted={currentPatient.transportStatus === 'COMPLETED'} 
      />
      <CompletedTransferStatus
        isOpen={isAccordionOpen}
        onToggle={() => setIsAccordionOpen(!isAccordionOpen)}
        transfers={completedTransfers}
      />
    </ContentWrapper>
  );
};

export default PatientStatusListPage;