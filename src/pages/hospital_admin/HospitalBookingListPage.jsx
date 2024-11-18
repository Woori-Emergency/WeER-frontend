import React, { useState, useEffect} from 'react';
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
import { API_BASE_URL, getAuthHeaders } from '../../components/api/config';
import { formatDate } from '../../utils/dateUtils';

const hospitalId = 1;
const HospitalBookingListPage = () => {

  const [bookingRequests, setBookingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState([]);
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/hospitals/reservations/${hospitalId}`,{
          method: 'GET',
          headers: getAuthHeaders()
        });
        const bookingData = await response.json();
        
        if (!response.ok) throw new Error(bookingData.message || '데이터를 불러오는데 실패했습니다.');

        const patientConditionIds = bookingData.result.map(request => request.patientconditionid);
        const patients = patientConditionIds.join(',');

        console.log("bookingData : {}",bookingData.result);
          // 추가 요청으로 각 환자의 상세 정보를 가져온다.  
        const patientInfoResponse = await fetch(`${API_BASE_URL}/hospitals/patients-info/${patients}`, {
          method: 'GET',
          headers: getAuthHeaders()
        });

        const patientInfoData = await patientInfoResponse.json();
        
        if (!patientInfoResponse.ok) throw new Error(patientInfoData.message || '환자 정보를 불러오는데 실패했습니다.');
        console.log("patientInfoData : {} ",patientInfoData);

        const enrichedRequests = bookingData.result.map(bookingRequest => {
          const patientInfo = patientInfoData.result.find(info => info.patientconditionid === bookingRequest.patientconditionid);
          return {
            // 예약 관련 정보
            id: bookingRequest.id,
            reservationStatus: bookingRequest.reservationStatus,
            patientconditionid: bookingRequest.patientconditionid,
            // 환자 상태 정보
            patientInfo: {
              gender: patientInfo.gender,
              age: patientInfo.ageGroup,           // ageGroup으로 수정
              category: patientInfo.medical,        // medical로 수정
              consciousness: patientInfo.consciousnessLevel,  // consciousnessLevel로 수정
              bloodPressure: patientInfo.bloodPressure,
              heartRate: patientInfo.heartRate,
              temperature: patientInfo.temperature,
              respiration: patientInfo.respiration,
              createdAt: patientInfo.createdAt
            }
          };
        });
        setBookingRequests(enrichedRequests);
        setLoading(false);
      } catch (err) { 
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchReservations();
  }, []);

  const handleApprove = async (request) => {
    
    console.log(request);
    try {
      const response = await fetch(`${API_BASE_URL}/hospitals/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          headers: getAuthHeaders()
        },
        body: JSON.stringify({
          reservationId: request.reservationId,
          hospitalId,
          patientconditionId: request.patientconditionid,
          reservationStatus: 'APPROVED',
          createdAt: request.createdAt,
          modifiedAt: new Date().toISOString()
        })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      if (data.success) {
        setBookingRequests(bookingRequests.map(req => 
          req.id === request.reservationId ? { ...req, reservationStatus: 'APPROVED' } : req
        ));
      }
    } catch (err) {
      setError('승인 처리 중 오류가 발생했습니다.');
    }
  };

  const handleReject = async (request) => {
    try {
      const response = await fetch(`${API_BASE_URL}/hospitals/decline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          headers: getAuthHeaders()
        },
        body: JSON.stringify({
          reservationId: request.reservationId,
          hospitalId,
          patientconditionId: request.patientconditionid,
          reservationStatus: 'DECLINED',
          createdAt: request.createdAt,
          modifiedAt: new Date().toISOString()
        })
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      if (data.success) {
        setBookingRequests(bookingRequests.map(req => 
          req.id === request.reservationId ? { ...req, reservationStatus: 'DECLINED' } : req
        ));
      }
    } catch (err) {
      setError('반려 처리 중 오류가 발생했습니다.');
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'PENDING': return '이송중';
      case 'APPROVED': return '승인됨';
      case 'DECLINED': return '반려됨';
      default: return '';
    }
  };

  return (
    <PageWrapper>
    <Container>
      <Header>
        <Title>환자 상태 정보</Title>
        <PendingBadge>
          대기 중: {bookingRequests.filter(r => r.reservationStatus === 'PENDING').length}
        </PendingBadge>
      </Header>

      <div>
        {bookingRequests.map((request, index) => (  
          <div key={request.id} style={{ marginBottom: index < bookingRequests.length - 1 ? '24px' : '0' }}>
            <Card>
              <CardHeader>
                <CardTitle>
                  <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>환자 정보</h2>
                  <RequestTime>이송 시작: {formatDate(request.patientInfo.createdAt)}</RequestTime>
                </CardTitle>
                <StatusBadge reservationStatus={request.reservationStatus}>
                  {getStatusText(request.reservationStatus)}
                </StatusBadge>
              </CardHeader>

              <InfoGrid>
                <InfoCard>
                  <InfoLabel>성별</InfoLabel>
                  <InfoValue>{
                    request.patientInfo.gender === 'MALE' ? '남성' :
                    request.patientInfo.gender === 'FEMALE' ? '여성' :
                    request.patientInfo.gender}

                  </InfoValue>
                </InfoCard>
                <InfoCard>
                  <InfoLabel>연령대</InfoLabel>
                  <InfoValue>{
                    
                    request.patientInfo.age === 'INFANT_TODDLER' ? '영유아' :
                    request.patientInfo.age === 'TEEN' ? '10대' :
                    request.patientInfo.age === 'TWENTIES' ? '20대' :
                    request.patientInfo.age === 'THIRTIES' ? '30대' :
                    request.patientInfo.age === 'FORTIES' ? '40대' :
                    request.patientInfo.age === 'FIFTIES' ? '50대' :
                    request.patientInfo.age === 'SIXTIES' ? '60대' :
                    request.patientInfo.age === 'SEVENTIES_PLUS' ? '70대 이상' :
                    request.patientInfo}
                  </InfoValue>
                </InfoCard>
                <InfoCard>
                  <InfoLabel>진료 구분</InfoLabel>
                  <InfoValue>{request.patientInfo.category}</InfoValue>
                </InfoCard>
                <InfoCard>
                  <InfoLabel>의식 수준</InfoLabel>
                  <InfoValue>{request.patientInfo.consciousness}</InfoValue>
                </InfoCard>
              </InfoGrid>

              <InfoGrid>
                <InfoCard bgColor="#FEF2F2">
                  <InfoLabel>혈압</InfoLabel>
                  <InfoValue>{request.patientInfo.bloodPressure}</InfoValue>
                </InfoCard>
                <InfoCard bgColor="#FEF3C7">
                  <InfoLabel>맥박</InfoLabel>
                  <InfoValue>{request.patientInfo.heartRate}</InfoValue>
                </InfoCard>
                <InfoCard bgColor="#FEF9C3">
                  <InfoLabel>체온</InfoLabel>
                  <InfoValue>{request.patientInfo.temperature}</InfoValue>
                </InfoCard>
                <InfoCard bgColor="#EFF6FF">
                  <InfoLabel>호흡수</InfoLabel>
                  <InfoValue>{request.patientInfo.respiration}</InfoValue>
                </InfoCard>
              </InfoGrid>

              {request.reservationStatus === 'PENDING' && (
                <ButtonContainer>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      handleReject(request);
                    }}
                  >
                    반려
                  </Button>
                  <Button 
                    onClick={() => {
                      handleApprove(bookingData.result);
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