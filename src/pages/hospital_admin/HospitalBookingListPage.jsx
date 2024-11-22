import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  ButtonContainer,
  Card,
  CardHeader,
  CardTitle,
  Header,
  InfoCard,
  InfoGrid,
  InfoLabel,
  InfoValue,
  PendingBadge,
  RequestTime,
  StatusBadge,
  Title
} from '../../components/HospitalBookingList/HospitalBookingListComponents';
import { getAuthHeaders } from '../../components/api/config';
import { formatDate } from '../../utils/dateUtils';
import { hospitalList } from '../../data/HospitalList';

//TODO: Need to Impl
const ContentWrapper = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const HospitalBookingListPage = () => {

  const [bookingRequests, setBookingRequests] = useState([]);
  const [hospital, setHospital ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchHospitalName = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/hospitals/hospital-name`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
        
        if (!response.ok) {
          throw new Error('병원 정보를 가져오는데 실패했습니다.');
        }
        
        const data = await response.json();
        const hospitalData = hospitalList.find(
          (hospital) => hospital.name === data.result);
        setHospital(hospitalData);

      } catch (err) {
        console.error('병원 정보 조회 실패:', err);
      }
    };

    fetchHospitalName();
  }, []);

  useEffect(() => {
    if (!hospital) return;
    const fetchReservations = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/hospitals/reservations/${hospital.id}`, {
          method: 'GET',
          headers: getAuthHeaders()
        });
        const bookingData = await response.json();
        
        if (!response.ok) throw new Error(bookingData.message || '데이터를 불러오는데 실패했습니다.');

        const patientConditionIds = bookingData.result.map(request => request.patientconditionid);
        const patients = patientConditionIds.join(',');

        const patientInfoResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/hospitals/patients-info/${patients}`, {
          method: 'GET',
          headers: getAuthHeaders()
        });

        const patientInfoData = await patientInfoResponse.json();
        
        if (!patientInfoResponse.ok) throw new Error(patientInfoData.message || '환자 정보를 불러오는데 실패했습니다.');

        const enrichedRequests = bookingData.result.map(bookingRequest => {
          // 매칭되는 환자 정보 찾기
          const patientInfo = patientInfoData.result.find(info => 
            info.patientconditionid === bookingRequest.patientconditionid
          );
        
          // 기본값을 포함한 안전한 patientInfo 객체 생성
          const safePatientInfo = {
            gender: patientInfo?.gender || '-',
            ageGroup: patientInfo?.ageGroup || '-',
            medical: patientInfo?.medical || '-',
            consciousnessLevel: patientInfo?.consciousnessLevel || '-',
            bloodPressure: patientInfo?.bloodPressure || '-',
            heartRate: patientInfo?.heartRate || '-',
            temperature: patientInfo?.temperature || '-',
            respiration: patientInfo?.respiration || '-',
            createdAt: patientInfo?.createdAt || bookingRequest.createdAt || new Date().toISOString(),
            specialty: patientInfo?.specialty || '-',
            diagnosis: patientInfo?.diagnosis || '-',
            memo: patientInfo?.memo || '-'
          };
        
          return {
            id: bookingRequest.id,
            reservationStatus: bookingRequest.reservationStatus,
            patientconditionid: bookingRequest.patientconditionid,
            reservationId: bookingRequest.reservationId,
            hospitalId: bookingRequest.hospitalId,
            createdAt: bookingRequest.createdAt,
            modifiedAt: bookingRequest.modifiedAt,
            
            patientInfo: {
              gender: safePatientInfo.gender,
              age: safePatientInfo.ageGroup,
              category: safePatientInfo.medical,
              consciousness: safePatientInfo.consciousnessLevel,
              bloodPressure: safePatientInfo.bloodPressure,
              heartRate: safePatientInfo.heartRate,
              temperature: safePatientInfo.temperature,
              respiration: safePatientInfo.respiration,
              createdAt: safePatientInfo.createdAt,
              specialty: safePatientInfo.specialty,
              diagnosis: safePatientInfo.diagnosis,
              memo: safePatientInfo.memo
            }
          };
        }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBookingRequests(enrichedRequests);
        setLoading(false);
      } catch (err) { 
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchReservations();
  }, [hospital]);

  const handleApprove = async (request) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/hospitals/approve`, {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reservationId: request.reservationId,
          hospitalId: request.hospitalId,
          patientconditionId: request.patientconditionid,
          reservationStatus: 'APPROVED',
          createdAt: request.createdAt,
          modifiedAt: new Date().toISOString()
        })
      });
      
      const data = await response.json();
      console.log('API Response:', data);
  
      if (!response.ok) throw new Error(data.message);
      
      // data.success 대신 status === 200 확인
      if (response.status === 200) {
        setBookingRequests(prevRequests => 
          prevRequests.map(req => 
            req.reservationId === request.reservationId
              ? { ...req, reservationStatus: data.result }
              : req
          )
        );
      }
    } catch (err) {
      console.error('Error:', err);
      setError('승인 처리 중 오류가 발생했습니다.');
    }
  };
  
  const handleReject = async (request) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/hospitals/decline`, {
        method: 'POST',
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reservationId: request.reservationId,
          hospitalId: request.hospitalId,
          patientconditionId: request.patientconditionid,
          reservationStatus: 'DECLINED',
          createdAt: request.createdAt,
          modifiedAt: new Date().toISOString()
        })
      });
      
      const data = await response.json();
      console.log('API Response:', data);
  
      if (!response.ok) throw new Error(data.message);
      
      // data.success 대신 status === 200 확인
      if (response.status === 200) {
        setBookingRequests(prevRequests => 
          prevRequests.map(req => 
            req.reservationId === request.reservationId
              ? { ...req, reservationStatus: data.result }
              : req
          )
        );
      }
    } catch (err) {
      console.error('Error:', err);
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

  const getAgeGroupText = (ageGroup) => {
    const ageGroupMap = {
      'INFANT_TODDLER': '영유아',
      'TEEN': '10대',
      'TWENTIES': '20대',
      'THIRTIES': '30대',
      'FORTIES': '40대',
      'FIFTIES': '50대',
      'SIXTIES': '60대',
      'SEVENTIES_PLUS': '70대 이상'
    };
    return ageGroupMap[ageGroup] || ageGroup;
  };

  const getGenderText = (gender) => {
    return gender === 'MALE' ? '남성' 
         : gender === 'FEMALE' ? '여성' 
         : gender === 'UNKNOWN' ? '미상' 
         : '-';
  };

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <ContentWrapper>
        <Header>
          <Title>{hospital.name} 예약 환자 상태 정보</Title>
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
                    <InfoValue>{getGenderText(request.patientInfo.gender)}</InfoValue>
                  </InfoCard>
                  <InfoCard>
                    <InfoLabel>연령대</InfoLabel>
                    <InfoValue>{getAgeGroupText(request.patientInfo.age)}</InfoValue>
                  </InfoCard>
                  <InfoCard>
                    <InfoLabel>진료 구분</InfoLabel>
                    <InfoValue>{request.patientInfo.category || '-'}</InfoValue>
                  </InfoCard>
                  <InfoCard>
                    <InfoLabel>의식 수준</InfoLabel>
                    <InfoValue>{request.patientInfo.consciousness || '-'}</InfoValue>
                  </InfoCard>
                </InfoGrid>

                <InfoGrid>
                  <InfoCard bgColor="#FEF2F2">
                    <InfoLabel>혈압</InfoLabel>
                    <InfoValue>{request.patientInfo.bloodPressure || '-'}</InfoValue>
                  </InfoCard>
                  <InfoCard bgColor="#FEF3C7">
                    <InfoLabel>맥박</InfoLabel>
                    <InfoValue>{request.patientInfo.heartRate || '-'}</InfoValue>
                  </InfoCard>
                  <InfoCard bgColor="#FEF9C3">
                    <InfoLabel>체온</InfoLabel>
                    <InfoValue>{request.patientInfo.temperature || '-'}</InfoValue>
                  </InfoCard>
                  <InfoCard bgColor="#EFF6FF">
                    <InfoLabel>호흡수</InfoLabel>
                    <InfoValue>{request.patientInfo.respiration || '-'}</InfoValue>
                  </InfoCard>
                </InfoGrid>

                {request.reservationStatus === 'PENDING' && (
                  <ButtonContainer>
                    <Button 
                      variant="outline"
                      onClick={() => handleReject(request)}
                    >
                      반려
                    </Button>
                    <Button 
                      onClick={() => {
                        console.log('Approve button clicked for request:', request);
                        handleApprove(request);
                      }}>
                      승인
                    </Button>
                  </ButtonContainer>
                )}
              </Card>
            </div>
          ))}
        </div>
      </ContentWrapper>
  );
};

export default HospitalBookingListPage;