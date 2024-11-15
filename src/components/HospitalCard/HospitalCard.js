import React, { useState, useEffect, useCallback } from 'react';
import * as S from './HospitalCard.styles';
import HospitalCardItem from './HospitalCardItem';
import { useGeoLocation } from '../GeoLocation/GeoLocation';
import { useLocation, useNavigate } from 'react-router-dom';

const GEOLOCATION_OPTIONS = {
    enableHighAccuracy: true, // 정확도 향상
    timeout: 1000 * 15,
    maximumAge: 1000 * 60 * 5
};

const API_BASE_URL = 'http://localhost:8080';

const HospitalCard = () => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { location: geoLocation, error: locationError } = useGeoLocation(GEOLOCATION_OPTIONS);
    const location = useLocation();
    const navigate = useNavigate();

    const getAuthHeaders = useCallback(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('AUTH_ERROR: 인증 토큰이 없습니다.');
        }
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }, []);

    const handleApiError = useCallback((error) => {
        console.error('API Error:', error);
        
        // 에러 타입에 따른 처리
        if (error.message.includes('AUTH_ERROR')) {
            localStorage.removeItem('accessToken');
            navigate('/login', { state: { from: location } });
        } else if (error.message.includes('NETWORK_ERROR')) {
            setError('네트워크 연결을 확인해주세요.');
        } else if (error.message.includes('SERVER_ERROR')) {
            setError('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } else {
            setError('예상치 못한 오류가 발생했습니다.');
        }
        
        setLoading(false);
    }, [navigate, location]);

    const fetchHospitals = useCallback(async (lat, lon) => {
        if (!lat || !lon) {
            setError('위치 정보가 필요합니다.');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(
                `${API_BASE_URL}/hospital/distance?lat=${lat}&lon=${lon}&range=50`,
                {
                    method: 'POST',
                    headers: getAuthHeaders()
                }
            );

            if (!response.ok) {
                throw new Error(`SERVER_ERROR: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.status === 200 && Array.isArray(data.result)) {
                setHospitals(data.result);
            } else {
                throw new Error(data.message || '병원 정보를 가져오는데 실패했습니다');
            }
        } catch (error) {
            if (error instanceof TypeError) {
                handleApiError(new Error('NETWORK_ERROR: 네트워크 연결을 확인해주세요.'));
            } else {
                handleApiError(error);
            }
        } finally {
            setLoading(false);
        }
    }, [getAuthHeaders, handleApiError]);

    const getCurrentPatient = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/reservation`, {
                method: 'GET',
                headers: getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error(`SERVER_ERROR: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.status !== 200) {
                throw new Error(data.message || '환자 정보를 가져오는데 실패했습니다');
            }

            let patientConditionId = null;

            if (Array.isArray(data.result) && data.result.length > 0) {
                patientConditionId = data.result[0].patientconditionid;
            } else if (data.result && typeof data.result === 'object') {
                patientConditionId = data.result.patientconditionid || data.result.patientConditionId;
            }

            if (!patientConditionId) {
                throw new Error('환자 정보가 없습니다');
            }

            return patientConditionId;
        } catch (error) {
            console.error("환자 정보 조회 중 에러:", error);
            handleApiError(error);
            throw error;
        }
    };

    const handleReservation = useCallback(async (hospitalId) => {
        try {
            const patientConditionId = await getCurrentPatient();
            
            if (!patientConditionId) {
                throw new Error('환자 상태 ID를 가져올 수 없습니다');
            }
            
            const response = await fetch(`${API_BASE_URL}/hospital/reserve`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify({
                    patientconditionId: patientConditionId,
                    hospitalId: hospitalId
                })
            });
    
            if (!response.ok) {
                throw new Error(`SERVER_ERROR: ${response.status}`);
            }
    
            const data = await response.json();
            
            if (data.status !== 200) {
                throw new Error(data.message || '예약 처리 중 오류가 발생했습니다');
            }
    
            // 예약 성공 시 사용자에게 알림
            return { success: true };
    
        } catch (error) {
            console.error("예약 처리 중 에러:", error);
            if (error.message.includes('환자 상태 ID')) {
                alert('환자 정보를 찾을 수 없습니다. 환자 정보를 먼저 등록해주세요.');
            } else {
                alert('예약 처리 중 오류가 발생했습니다.');
            }
            handleApiError(error);
            throw error;
        }
    }, [getAuthHeaders, handleApiError, getCurrentPatient]);

    useEffect(() => {
        if (geoLocation?.latitude && geoLocation?.longitude) {
            fetchHospitals(geoLocation.latitude, geoLocation.longitude);
        }
    }, [geoLocation, fetchHospitals]);

    if (locationError) {
        return <S.ErrorMessage>위치 정보를 가져오는데 실패했습니다: {locationError}</S.ErrorMessage>;
    }

    if (!geoLocation && !location?.state?.hospitals) {
        return <S.LoadingMessage>위치 정보를 가져오는 중...</S.LoadingMessage>;
    }

    if (loading) {
        return <S.LoadingMessage>병원 정보를 불러오는 중...</S.LoadingMessage>;
    }

    if (error) {
        return <S.ErrorMessage>{error}</S.ErrorMessage>;
    }

    return (
        <S.CardsContainer>
            {hospitals.map((hospital) => (
                <HospitalCardItem
                    key={hospital.hospitalId}
                    hospitalData={hospital}
                    onReservation={() => handleReservation(hospital.hospitalId)}
                />
            ))}
        </S.CardsContainer>
    );
};

export default HospitalCard;