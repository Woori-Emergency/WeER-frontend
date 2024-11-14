import React, { useState } from 'react';
import * as S from './HospitalCard.styles';
import IcuSection from '../IcuSection/IcuSection';

const HospitalCardItem = ({ hospitalData, onReservation }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReservationRequested, setIsReservationRequested] = useState(false);
    const [reservationError, setReservationError] = useState(null);

    const handleReservation = async () => {
        if (isReservationRequested) return; // 이미 예약 요청된 경우 중복 실행 방지
        
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error('로그인이 필요합니다');
            }
    
            setReservationError(null);
            await onReservation(); // 부모 컴포넌트의 handleReservation 실행
            setIsReservationRequested(true); // 성공시에만 상태 변경
            
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

                {/* {isModalOpen && (
                    <S.ModalOverlay onClick={() => setIsModalOpen(false)}>
                        <S.Modal onClick={(e) => e.stopPropagation()}>
                            <S.ModalTitle>장비 정보</S.ModalTitle>
                            <S.ModalContent>
                                <S.EquipmentGrid>
                                    {Object.entries(equipmentData).map(([key, value]) => (
                                        <S.EquipmentItem key={key}>
                                            <S.EquipmentLabel>
                                                {getEquipmentLabel(key)}
                                            </S.EquipmentLabel>
                                            <S.EquipmentStatus available={value.available}>
                                                {value.available 
                                                    ? `${value.count}대 사용 가능` 
                                                    : '사용 불가능'}
                                            </S.EquipmentStatus>
                                        </S.EquipmentItem>
                                    ))}
                                </S.EquipmentGrid>
                            </S.ModalContent>
                            <S.CloseButton onClick={() => setIsModalOpen(false)}>
                                닫기
                            </S.CloseButton>
                        </S.Modal>
                    </S.ModalOverlay>
                )} */}
            </S.Header>

            <S.ContentLayout>
                <S.Section>
                    <S.SectionTitle>응급실</S.SectionTitle>
                    <S.InfoGrid>
                        <S.GridRow>
                            <S.Label>일반</S.Label>
                            <S.Value>
                                <S.StatusIcon isAvailable={true} />
                                8/15
                            </S.Value>
                        </S.GridRow>
                        <S.GridRow>
                            <S.Label>코호트 격리</S.Label>
                            <S.Value>None</S.Value>
                        </S.GridRow>
                        <S.GridRow>
                            <S.Label>음압격리</S.Label>
                            <S.Value>
                                <S.StatusIcon isAvailable={true} />
                                2/2
                            </S.Value>
                        </S.GridRow>
                        <S.GridRow>
                            <S.Label>일반격리</S.Label>
                            <S.Value>
                                <S.StatusIcon isAvailable={false} />
                                0/3
                            </S.Value>
                        </S.GridRow>
                        <S.GridRow>
                            <S.Label>외상소생실</S.Label>
                            <S.Value>None</S.Value>
                        </S.GridRow>
                        <S.GridRow>
                            <S.Label>소아</S.Label>
                            <S.Value>
                                <S.StatusIcon isAvailable={true} />
                                3/3
                            </S.Value>
                        </S.GridRow>
                    </S.InfoGrid>
                </S.Section>

                <S.Section>
                    <S.SectionTitle>중환자실</S.SectionTitle>
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

const getEquipmentLabel = (key) => {
    const labels = {
        regularVentilator: '인공호흡기 일반',
        prematureVentilator: '인공호흡기 조산아용',
        incubator: '인큐베이터',
        crrt: 'CRRT',
        ecmo: 'ECMO',
        temperatureController: '중심체온조절 장치',
        hyperbaricChamber: '고압 산소 치료기',
        ctScanner: 'CT 스캔',
        mri: 'MRI',
        angiographer: '혈관촬영기'
    };
    return labels[key];
};

export default HospitalCardItem;