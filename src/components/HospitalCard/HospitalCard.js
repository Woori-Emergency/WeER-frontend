import React, { useState, useEffect, useCallback } from 'react';
import * as S from './HospitalCard.styles';
import HospitalCardItem from './HospitalCardItem';
import { useGeoLocation } from '../GeoLocation/GeoLocation';
import { useLocation, useNavigate } from 'react-router-dom';

const GEOLOCATION_OPTIONS = {
    enableHighAccuracy: false,
    timeout: 1000 * 15,
    maximumAge: 1000 * 60 * 5 * 10
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
            throw new Error('인증 토큰이 없습니다.');
        }
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }, []);

    const fetchHospitals = useCallback(async (lat, lon) => {
        try {
            setLoading(true);
            const response = await fetch(
                `${API_BASE_URL}/hospital/distance?lat=${lat}&lon=${lon}&range=50`,
                {
                    method: 'POST',
                    headers: getAuthHeaders()
                }
            );

            const data = await response.json();
            
            if (data.status === 200 && Array.isArray(data.result)) {
                setHospitals(data.result);
            } else {
                throw new Error(data.message || '병원 정보를 가져오는데 실패했습니다');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [getAuthHeaders]);

    useEffect(() => {
        if (geoLocation) {
            fetchHospitals(geoLocation.latitude, geoLocation.longitude);
        }
    }, [geoLocation, fetchHospitals]);

    if (locationError) {
        return <div>위치 정보를 가져오는데 실패했습니다: {locationError}</div>;
    }

    if (!geoLocation) {
        return <div>위치 정보를 가져오는 중...</div>;
    }

    if (loading) {
        return <div>병원 정보를 불러오는 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <S.CardsContainer>
            {hospitals.map((hospital, index) => (
                <HospitalCardItem
                    key={hospital.hospitalId || index}
                    hospitalData={hospital}
                />
            ))}
        </S.CardsContainer>
    );
};

export default HospitalCard;