import { getCurrentPatientReservation } from '../components/api/currentReservation';

export const checkHospitalReservation = async (hospitalId) => {
    try {
        const reservations = await getCurrentPatientReservation();
        return reservations.some(
            reservation => reservation.hospitalId === hospitalId
        );
    } catch (error) {
        console.error('예약 정보 확인 중 오류:', error);
        return false;
    }
};