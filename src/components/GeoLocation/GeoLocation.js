import { useState, useEffect } from 'react';

export const useGeoLocation = (options = {}) => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState('');

    // 위치 정보 가져오기 성공 시 호출되는 함수
    const handleSuccess = (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({
            latitude,
            longitude,
        });
    };

    // 위치 정보 가져오기 실패 시 호출되는 함수
    const handleError = (err) => {
        setError(err.message);
    };

    useEffect(() => {
        // navigator.geolocation 존재 여부 확인
        const { geolocation } = navigator;
        
        // geolocation이 지원되지 않는 경우
        if (!geolocation) {
            setError('Geolocation is not supported.');
            return;
        }

        // 현재 위치 가져오기
        geolocation.getCurrentPosition(
            handleSuccess,
            handleError,
            options
        );
    }, [options]); // options가 변경될 때마다 effect 실행

    return { location, error };
};

