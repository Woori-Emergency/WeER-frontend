import { API_BASE_URL, getAuthHeaders } from './config';

export const getCurrentPatient = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/reservation`, {
        method: 'GET',
        headers: getAuthHeaders()
      });
  
      const data = await response.json();
  
      if (Array.isArray(data.result)) {
        const inProgressPatient = data.result.find(
          patient => patient.transportStatus === 'IN_PROGRESS'
        );
        
        if (!inProgressPatient) {
          throw new Error('진행 중인 이송 환자 정보가 없습니다');
        }
  
        return inProgressPatient;
      }
  
      // 데이터가 단일 객체인 경우 처리
      if (data.result && typeof data.result === 'object') {
        if (data.result.transportStatus !== 'IN_PROGRESS') {
          throw new Error('진행 중인 이송 환자 정보가 없습니다');
        }
        return data.result;
      }
  
      throw new Error('환자 정보 형식이 올바르지 않습니다');
    } catch (error) {
      console.error("환자 정보 조회 중 에러:", error);
      throw error;
    }
  };