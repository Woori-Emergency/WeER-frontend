import { getAuthHeaders } from './config';
import { getCurrentPatient } from './currentPatient';
 
const getHospitalName = async (hospitalId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/hospital/detail?hospitalid=${hospitalId}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
  
      if (!response.ok) {
        throw new Error('병원 정보 조회 실패');
      }
  
      const data = await response.json();
      return data.result.name; // 병원 이름만 반환
    } catch (error) {
      console.error(`병원 ID ${hospitalId} 조회 중 에러:`, error);
      return '알 수 없는 병원';
    }
  };

  export const getCurrentPatientReservation = async () => {
    try {
      // 1. 현재 환자 정보 조회
      const patient = await getCurrentPatient();
      console.log("환자 아이디", patient.patientconditionid);
  
      // 2. 환자의 예약 정보 조회
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/hospital/patient/${patient.patientconditionid}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
  
      if (!response.ok) {
        throw new Error('예약 정보 조회 실패');
      }
  
      const data = await response.json();
      
      // 3. 예약 정보가 있는 경우 각 예약에 대해 병원 이름 조회
      if (Array.isArray(data.result)) {
        // Promise.all을 사용하여 모든 병원 정보를 병렬로 조회
        const reservationsWithNames = await Promise.all(
          data.result.map(async (reservation) => {
            const hospitalName = await getHospitalName(reservation.hospitalId);
            return {
              ...reservation,
              hospitalName // 기존 예약 정보에 병원 이름 추가
            };
          })
        );
  
        return reservationsWithNames;
      } else {
        console.warn('예약 정보가 배열이 아닙니다:', data.result);
        return [];
      }
    } catch (error) {
      console.error("환자 예약 정보 조회 중 에러:", error);
      throw error;
    }
  };