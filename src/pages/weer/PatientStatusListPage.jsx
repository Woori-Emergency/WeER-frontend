import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem 1rem;
`;

const ContentWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;  // flex-start에서 center로 변경
`;

const CardTitleSection = styled.div`
  display: flex;
  align-items: center;  // 추가
  gap: 1rem;  // 0.5rem에서 1rem으로 증가
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;  // 1.25rem에서 1.5rem으로 증가
  font-weight: bold;
  color: #333;
`;

const TransportInfo = styled.span`
  font-size: 1rem;  // 0.875rem에서 1rem으로 증가
  color: #666;
  margin-left: auto;  // 추가
`;

const TransportStatus = styled.div`
  background: #ffc107;
  color: #856404;
  padding: 0.5rem 1.25rem;  // 패딩 증가
  border-radius: 9999px;
  font-weight: 600;  // 500에서 600으로 증가
  font-size: 1.1rem;  // 0.875rem에서 1.1rem로 증가
  margin-left: 1rem;  // 추가
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const InfoCard = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${props => props.color || '#f3f4f6'};
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  flex: 1;
  min-width: 150px;
  padding: 1rem;
  border: none;
  background-color: white;
  color: #374151;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f8fafc;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    background-color: #f1f5f9;
  }
`;

const PatientStatusView = () => {
  const currentPatient = {
    userId: 1,
    gender: 'MALE',
    ageGroup: 'THIRTIES',
    bloodPressure: 125,
    heartRate: 75,
    temperature: 36.8,
    respiration: 16,
    medical: 'DISEASE',
    consciousnessLevel: 'ALERT',
    transportStatus: 'IN_PROGRESS',
    startTime: "2024-11-08T10:22:30"
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDistanceSort = () => {
    // 거리순 정렬 로직
    console.log('거리순 정렬');
  };

  const handleEmergencyFilter = () => {
    // 응급실 필터링 로직
    console.log('응급실 필터링');
  };

  return (
    <Container>
      <ContentWrapper>
        {/* 통합된 환자 상태 카드 */}
        <Card>
          <CardHeader>
            <CardTitleSection>
              <CardTitle>환자 상태 정보</CardTitle>
              <TransportInfo>이송 시작: {formatDate(currentPatient.startTime)}</TransportInfo>
            </CardTitleSection>
            <TransportStatus>이송중</TransportStatus>
          </CardHeader>
          
          <CardContent>
            <InfoGrid>
              <InfoCard>
                <InfoLabel>성별</InfoLabel>
                <InfoValue>
                  {currentPatient.gender === 'MALE' ? '남성' : 
                   currentPatient.gender === 'FEMALE' ? '여성' : '미상'}
                </InfoValue>
              </InfoCard>

              <InfoCard>
                <InfoLabel>연령대</InfoLabel>
                <InfoValue>
                  {currentPatient.ageGroup === 'THIRTIES' ? '30대' : currentPatient.ageGroup}
                </InfoValue>
              </InfoCard>

              <InfoCard>
                <InfoLabel>진료 구분</InfoLabel>
                <InfoValue>
                  {currentPatient.medical === 'DISEASE' ? '질병' : '질병 외'}
                </InfoValue>
              </InfoCard>

              <InfoCard>
                <InfoLabel>의식 수준</InfoLabel>
                <InfoValue>{currentPatient.consciousnessLevel}</InfoValue>
              </InfoCard>

              <InfoCard color="#fee2e2">
                <InfoLabel>혈압</InfoLabel>
                <InfoValue>{currentPatient.bloodPressure} mmHg</InfoValue>
              </InfoCard>

              <InfoCard color="#ffedd5">
                <InfoLabel>맥박</InfoLabel>
                <InfoValue>{currentPatient.heartRate} bpm</InfoValue>
              </InfoCard>

              <InfoCard color="#fef3c7">
                <InfoLabel>체온</InfoLabel>
                <InfoValue>{currentPatient.temperature}°C</InfoValue>
              </InfoCard>

              <InfoCard color="#dbeafe">
                <InfoLabel>호흡수</InfoLabel>
                <InfoValue>{currentPatient.respiration} /min</InfoValue>
              </InfoCard>
            </InfoGrid>
          </CardContent>
        </Card>

        {/* 필터 버튼 */}
        <FilterContainer>
          <FilterButton onClick={handleDistanceSort}>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 2a14 14 0 0 0 0 20 14 14 0 0 0 0-20"/>
              <path d="M2 12h20"/>
            </svg>
            거리순 보기
          </FilterButton>
          
          <FilterButton onClick={handleEmergencyFilter}>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M8 2h8"/>
              <path d="M12 2v8"/>
              <circle cx="12" cy="14" r="8"/>
            </svg>
            응급실 필터링 검색
          </FilterButton>
        </FilterContainer>
      </ContentWrapper>
    </Container>
  );
};

export default PatientStatusView;