import React, { useEffect, useState } from 'react';
import { checkHospitalReservation } from '../../utils/checkReservation';
import Emergency from '../ER/Emergency';
import EquipmentStatusModal from '../Equipments/Equipments';
import IcuSection from '../IcuSection/IcuSection';
import * as S from './HospitalCard.styles';

const HospitalCardItem = ({ hospitalData, onReservation }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReservationRequested, setIsReservationRequested] = useState(false);
    const [reservationError, setReservationError] = useState(null);

    useEffect(() => {
        const updateReservationStatus = async () => {
            const hasReservation = await checkHospitalReservation(hospitalData.hospitalId);
            setIsReservationRequested(hasReservation);
        };

        updateReservationStatus();
    }, [hospitalData.hospitalId]);

    const handleReservation = async () => {
        if (isReservationRequested) return;

        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error('로그인이 필요합니다');
            }
            setReservationError(null);
            await onReservation();
            setIsReservationRequested(true);
        } catch (error) {
            console.error('예약 요청 중 오류 발생:', error);
            setReservationError(error.message);
            setIsReservationRequested(false);
        }
    };

    return (
        <S.CardWrapper>
            <S.Header>
                <S.HospitalInfo>
                    <S.HospitalName>
                        {hospitalData.name}
                    </S.HospitalName>
                    <S.StatusInfo>
                        <S.StatusDot />
                        <span>상태:</span>
                        <S.Distance>
                            거리: {(hospitalData.roadDistance/1000).toFixed(1)}KM
                        </S.Distance>
                    </S.StatusInfo>
                </S.HospitalInfo>
                <S.ButtonGroup>
                    <S.InfoButton onClick={() => setIsModalOpen(true)}>장비 정보</S.InfoButton>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <S.ReservationButton 
                            onClick={handleReservation}
                            disabled={isReservationRequested}
                            style={{
                                opacity: isReservationRequested ? 0.7 : 1,
                                cursor: isReservationRequested ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isReservationRequested ? '예약 요청됨' : '예약 →'}
                        </S.ReservationButton>
                        {reservationError && (
                            <S.ErrorMessage>{reservationError}</S.ErrorMessage>
                        )}
                    </div>
                </S.ButtonGroup>
                <EquipmentStatusModal 
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  hospitalId={hospitalData.hospitalId}
/>
            </S.Header>

            <S.ContentLayout>
                <S.Section>
                    <Emergency hospitalId={hospitalData.hospitalId} />
                </S.Section>

                <S.Section>
                    <IcuSection hospitalId={hospitalData.hospitalId} />
                </S.Section>
            </S.ContentLayout>

            <S.NoticeLink 
            to="/hospital-notice" 
            state={{ hospitalId: hospitalData.hospitalId, hospitalName: hospitalData.name}}
          >
                <S.NoticeBar />
                <S.NoticeIcon>📢</S.NoticeIcon>
                알림을 확인할 수 있습니다.
            </S.NoticeLink>
        </S.CardWrapper>
    );
};

export default HospitalCardItem;