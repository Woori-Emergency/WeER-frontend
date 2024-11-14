import React, { useState, useEffect } from 'react';
import * as S from './HospitalCard.styles';
import HospitalCardItem from './HospitalCardItem';

const HospitalCard = () => {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchHospitals();
    }, []);

    const fetchHospitals = async () => {
        try {
            setLoading(true);
            const data = await getHospitalInfo();
            setHospitals(data);
        } catch (error) {
            console.error('병원 정보를 가져오는데 실패했습니다:', error);
            setError('병원 정보를 불러오는데 실패했습니다');
        } finally {
            setLoading(false);
        }
    };

    const getHospitalInfo = async () => {
        const token = localStorage.getItem('accessToken');
        
        try {
            const response = await fetch(`http://localhost:8080/hospital/location?lat=37.5009902618151&lon=127.050967336445&range=100`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            
            const data = await response.json();
            
            if (data.status === 200) {
                if (data.result.length > 0) {
                  const sortedHospitals = data.result.sort((a, b) => a.roadDistance - b.roadDistance);
                  console.log('정렬된 병원 목록:', sortedHospitals);
                  return sortedHospitals;
                }
                console.log('해당 위치에서 병원을 찾을 수 없습니다.');
                return [];
            }
            throw new Error(data.message);
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };

    // 병원 공지사항을 가져오려면 병원 고유의 번호가 필요한데, 그걸 가져올 곳이 없음
    const getHospitalAnnouncement = async () => {
      // const token = localStorage.getItem('accessToken');
      
      // try {
      //     const response = await fetch(`http://localhost:8080/hospital/announcement?hospitalid`, {
      //         method: 'GET',
      //         headers: {
      //             'Content-Type': 'application/json',
      //             'Authorization': `Bearer ${token}`
      //         },
      //     });
  };


    // 이것도 병원 예약할 때 그 병원의 고유 번호가 필요한데 가져올 방법이 없음
    const handleReservation = async (hospitalId) => {
        const token = localStorage.getItem('accessToken');
        
        const response = await fetch('http://localhost:8080/hospital/reserve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                patientconditionId: 1,
                hospitalId: hospitalId
            })
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
            }
            throw new Error('예약 요청에 실패했습니다');
        }

        return response.json();
    };

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
                    key={hospital.id || index}
                    hospitalData={hospital}
                    onReservation={() => handleReservation(hospital.id)}
                />
            ))}
        </S.CardsContainer>
    );
};

export default HospitalCard;