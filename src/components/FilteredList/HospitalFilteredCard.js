import React, { useState, useEffect, useCallback } from 'react';
import * as S from './HospitalFilteredCard.styles';
import HospitalCardItem from './HospitalFilteredCardItem';
import { useGeoLocation } from '../GeoLocation/GeoLocation';
import { useLocation, useNavigate } from 'react-router-dom';

const GEOLOCATION_OPTIONS = {
    enableHighAccuracy: false,
    timeout: 1000 * 30,
    maximumAge: 1000 * 60 * 5
};

const API_BASE_URL = 'http://localhost:8080';

const HospitalFilteredCard = () => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { location: geoLocation, error: locationError } = useGeoLocation(GEOLOCATION_OPTIONS);  // 추가


    console.log('위치 정보 상태:', location.state?.hospitalData);

    const getAuthHeaders = useCallback(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('인증 토큰이 없습니다.');
        }
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }, []);

    const handleApiError = useCallback((error) => {
        console.error('API Error:', error);
        if (error.message.includes('인증')) {
            localStorage.removeItem('accessToken');
            navigate('/login', { state: { from: location } });
        }
        setError(error.message);
        setLoading(false);
    }, [navigate, location]);

    const getCurrentPatient = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/reservation`, {
                method: 'GET',
                headers: getAuthHeaders()
            });
    
            const data = await response.json();
            console.log("환자 정보 전체 응답:", data);
            console.log("환자 정보 result:", data.result);
            console.log("환자 정보 result 타입:", typeof data.result);
            
            if (!response.ok || data.status !== 200) {
                throw new Error(data.message || '환자 정보를 가져오는데 실패했습니다');
            }
    
            // data.result가 배열인 경우
            if (Array.isArray(data.result)) {
                if (data.result.length > 0) {
                    return data.result[0].patientconditionid;
                }
                throw new Error('환자 정보가 없습니다');
            }
            
            // data.result가 객체인 경우
            if (data.result && typeof data.result === 'object') {
                return data.result.patientconditionid || data.result.patientConditionId;
            }
    
            throw new Error('환자 정보 형식이 올바르지 않습니다');
        } catch (error) {
            console.error("환자 정보 조회 중 에러:", error);
            handleApiError(error);
            throw error;
        }
    };
    
    const handleReservation = useCallback(async (hospitalId) => {
        try {
            const patientConditionId = await getCurrentPatient();
            console.log("받아온 환자 상태 ID:", patientConditionId);
            
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
    
            const data = await response.json();
            console.log("예약 응답:", data);
            
            if (!response.ok || data.status !== 200) {
                throw new Error(data.message || '예약 처리 중 오류가 발생했습니다');
            }
    
            return { success: true };
    
        } catch (error) {
            console.error("예약 처리 중 에러:", error);
            handleApiError(error);
            throw error;
        }
    }, [getAuthHeaders, handleApiError]);
    
    useEffect(() => {
        try {
            const searchData = location?.state;
            if (!searchData?.hospitalData) {
                throw new Error('병원 데이터가 없습니다');
            }
            if (searchData.hospitalData.length === 0) {
                alert('검색 결과가 없어 전체 병원 목록을 표시합니다.');
                navigate('/hospital-list', { 
                    state: { 
                        latitude: geoLocation.latitude,
                        longitude: geoLocation.longitude
                    }
                });
            }
            setHospitals(searchData.hospitalData);
            setLoading(false);
        } catch (error) {
            handleApiError(error);
        }
    }, [location, handleApiError]);

    return (
        <S.CardsContainer>
            {hospitals.map((hospital, index) => (
                <HospitalCardItem
                    key={hospital.hospitalId || index}
                    hospitalData={hospital}
                    onReservation={() => handleReservation(hospital.hospitalId)}
                />
            ))}
        </S.CardsContainer>
    );
            }


export default HospitalFilteredCard;