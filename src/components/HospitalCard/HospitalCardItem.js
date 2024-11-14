import React, { useState } from 'react';
import * as S from './HospitalCard.styles';

const HospitalCardItem = ({ hospitalData, onReservation }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReservationRequested, setIsReservationRequested] = useState(false);
    const [reservationError, setReservationError] = useState(null);

    const handleReservation = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error('로그인이 필요합니다');
            }

            await onReservation();
            setIsReservationRequested(true);
            setReservationError(null);
        } catch (error) {
            console.error('예약 요청 중 오류 발생:', error);
            setReservationError(error.message);
            setIsReservationRequested(false);
        }
    };

    const equipmentData = {
        regularVentilator: { available: true, count: 5 },
        prematureVentilator: { available: false, count: 0 },
        incubator: { available: true, count: 3 },
        crrt: { available: true, count: 2 },
        ecmo: { available: false, count: 0 },
        temperatureController: { available: true, count: 1 },
        hyperbaricChamber: { available: false, count: 0 },
        ctScanner: { available: true, count: 1 },
        mri: { available: true, count: 1 },
        angiographer: { available: false, count: 0 },
    };

    return (
        <S.CardWrapper>
            <S.Header>
                <S.HospitalInfo>
                    <S.HospitalName>
                        {hospitalData.hospitalName}
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

                {isModalOpen && (
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
                )}
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
                    <S.InfoGrid>
                        <S.GridRow>
                            <S.Label>일반</S.Label>
                            <S.Value>8/15</S.Value>
                        </S.GridRow>
                        <S.GridRow>
                            <S.Label>내과</S.Label>
                            <S.Value>None</S.Value>
                        </S.GridRow>
                        <S.GridRow>
                            <S.Label>외과</S.Label>
                            <S.Value>None</S.Value>
                        </S.GridRow>
                        <S.GridRow>
                            <S.Label>음압격리</S.Label>
                            <S.Value>2/2</S.Value>
                        </S.GridRow>
                        <S.GridRow>
                            <S.Label>심장내과</S.Label>
                            <S.Value>2/2</S.Value>
                        </S.GridRow>
                        <S.GridRow>
                            <S.Label>신경외과</S.Label>
                            <S.Value>None</S.Value>
                        </S.GridRow>
                        <S.GridRow>
                            <S.Label>소아</S.Label>
                            <S.Value>None</S.Value>
                        </S.GridRow>
                        <S.GridRow>
                            <S.Label>신경과</S.Label>
                            <S.Value>None</S.Value>
                        </S.GridRow>
                        <S.GridRow>
                            <S.Label>흉부외과</S.Label>
                            <S.Value>None</S.Value>
                        </S.GridRow>
                        <S.GridRow>
                            <S.Label>신생아</S.Label>
                            <S.Value>2/2</S.Value>
                        </S.GridRow>
                        <S.GridRow>
                            <S.Label>화상</S.Label>
                            <S.Value>2/2</S.Value>
                        </S.GridRow>
                    </S.InfoGrid>
                </S.Section>
            </S.ContentLayout>

            <S.NoticeLink to="/hospital-notice">
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