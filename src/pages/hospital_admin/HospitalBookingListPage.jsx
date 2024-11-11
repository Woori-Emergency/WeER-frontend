import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const PendingBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 9999px;
  font-size: 14px;
`;

const CardGrid = styled.div`
  display: grid;
  gap: 24px;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 24px;
`;

const CardTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RequestTime = styled.span`
  color: #6b7280;
  font-size: 14px;
`;

const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 14px;
  background-color: ${props => {
    switch(props.status) {
      case 'pending': return '#FCD34D';
      case 'approved': return '#10B981';
      case 'rejected': return '#EF4444';
      default: return '#E5E7EB';
    }
  }};
  color: ${props => props.status === 'pending' ? '#000' : '#FFF'};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const InfoCard = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: ${props => props.bgColor || '#F3F4F6'};
`;

const InfoLabel = styled.div`
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 4px;
`;

const InfoValue = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button`
  padding: 8px 24px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  
  ${props => props.variant === 'outline' 
    ? `
      border: 1px solid #E5E7EB;
      background: transparent;
      &:hover {
        background: #F3F4F6;
      }
    `
    : `
      background: #3B82F6;
      color: white;
      border: none;
      &:hover {
        background: #2563EB;
      }
    `
  }
`;

const HospitalBookingListPage = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      gender: '남성',
      age: '30대',
      category: '질병',
      consciousness: 'ALERT',
      vitals: {
        bloodPressure: '125 mmHg',
        heartRate: '75 bpm',
        temperature: '36.8°C',
        respiration: '16 /min'
      },
      requestTime: '11월 8일 오전 10:22',
      status: 'pending'
    },
    {
      id: 2,
      gender: '여성',
      age: '50대',
      category: '외상',
      consciousness: 'ALERT',
      vitals: {
        bloodPressure: '135 mmHg',
        heartRate: '82 bpm',
        temperature: '37.1°C',
        respiration: '18 /min'
      },
      requestTime: '11월 8일 오전 10:15',
      status: 'pending'
    }
  ]);

  const handleApprove = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'approved' } : req
    ));
  };

  const handleReject = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'rejected' } : req
    ));
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return '이송중';
      case 'approved': return '승인됨';
      case 'rejected': return '반려됨';
      default: return '';
    }
  };

  return (
    <Container>
      <Header>
        <Title>환자 상태 정보</Title>
        <PendingBadge>
          대기 중: {requests.filter(r => r.status === 'pending').length}
        </PendingBadge>
      </Header>

      <CardGrid>
        {requests.map(request => (
          <Card key={request.id}>
            <CardHeader>
              <CardTitle>
                <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>환자 정보</h2>
                <RequestTime>이송 시작: {request.requestTime}</RequestTime>
              </CardTitle>
              <StatusBadge status={request.status}>
                {getStatusText(request.status)}
              </StatusBadge>
            </CardHeader>

            <InfoGrid>
              <InfoCard>
                <InfoLabel>성별</InfoLabel>
                <InfoValue>{request.gender}</InfoValue>
              </InfoCard>
              <InfoCard>
                <InfoLabel>연령대</InfoLabel>
                <InfoValue>{request.age}</InfoValue>
              </InfoCard>
              <InfoCard>
                <InfoLabel>진료 구분</InfoLabel>
                <InfoValue>{request.category}</InfoValue>
              </InfoCard>
              <InfoCard>
                <InfoLabel>의식 수준</InfoLabel>
                <InfoValue>{request.consciousness}</InfoValue>
              </InfoCard>
            </InfoGrid>

            <InfoGrid>
              <InfoCard bgColor="#FEF2F2">
                <InfoLabel>혈압</InfoLabel>
                <InfoValue>{request.vitals.bloodPressure}</InfoValue>
              </InfoCard>
              <InfoCard bgColor="#FEF3C7">
                <InfoLabel>맥박</InfoLabel>
                <InfoValue>{request.vitals.heartRate}</InfoValue>
              </InfoCard>
              <InfoCard bgColor="#FEF9C3">
                <InfoLabel>체온</InfoLabel>
                <InfoValue>{request.vitals.temperature}</InfoValue>
              </InfoCard>
              <InfoCard bgColor="#EFF6FF">
                <InfoLabel>호흡수</InfoLabel>
                <InfoValue>{request.vitals.respiration}</InfoValue>
              </InfoCard>
            </InfoGrid>

            {request.status === 'pending' && (
              <ButtonContainer>
                <Button 
                  variant="outline"
                  onClick={() => handleReject(request.id)}
                >
                  반려
                </Button>
                <Button 
                  onClick={() => handleApprove(request.id)}
                >
                  승인
                </Button>
              </ButtonContainer>
            )}
          </Card>
        ))}
      </CardGrid>
    </Container>
  );
};

export default HospitalBookingListPage;