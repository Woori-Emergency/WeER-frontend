import React, { useState } from 'react';
import {
  Container,
  Header,
  Title,
  PendingBadge,
  Card,
  CardHeader,
  CardTitle,
  RequestTime,
  StatusBadge,
  InfoGrid,
  InfoCard,
  InfoLabel,
  InfoValue,
  ButtonContainer,
  Button
} from '../../components/HospitalBookingList/HospitalBookingListComponents';
import { PageWrapper } from '../../styles/CommonStyles';

const HospitalBookingListPage = () => {
  const [requests, setRequests] = useState([
    {
      patientId: 1,
      gender: '남성',
      age: '30대',
      medical: '질병',
      consciousness: 'ALERT',
      bloodPressure: '125',
      heartRate: '75',
      temperature: '36.8',
      respiration: '16',
      created_at: '11월 8일 오전 10:22',
      status: 'pending'
    },
    {
      patientId: 2,
      gender: '여성',
      age: '50대',
      medical: '외상',
      consciousness: 'ALERT',
      bloodPressure: '135',
      heartRate: '82',
      temperature: '37.1',
      respiration: '18',
      created_at: '11월 8일 오전 10:15',
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
    <PageWrapper>
    <Container>
      <Header>
        <Title>환자 상태 정보</Title>
        <PendingBadge>
          대기 중: {requests.filter(r => r.status === 'pending').length}
        </PendingBadge>
      </Header>

      <div>
        {requests.map((request, index) => (
          <div key={request.id} style={{ marginBottom: index < requests.length - 1 ? '24px' : '0' }}>
            <Card>
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
                    onClick={() => {
                      handleReject(request.id);
                    }}
                  >
                    반려
                  </Button>
                  <Button 
                    onClick={() => {
                      handleApprove(request.id);
                    }}
                  >
                    승인
                  </Button>
                </ButtonContainer>
              )}
            </Card>
          </div>
        ))}
      </div>
    </Container>
    </PageWrapper>
  );
};

export default HospitalBookingListPage;