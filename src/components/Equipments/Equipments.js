import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as S from '../HospitalCard/HospitalCard.styles';

const getEquipmentLabel = (key) => {
    const equipmentLabels = {
        hvventiAYN: '인공호흡기 (일반)',
        hvventisoAYN: '인공호흡기 (조산아용)',
        hvinCUAYN: '인큐베이터',
        hvcrrTAYN: 'CRRT (신대체요법기)',
        hvecmoAYN: 'ECMO (체외막 산소공급 장치)',
        hvhypoAYN: '중심체온조절 장치',
        hvoxyAYN: '고압 산소 치료기',
        hvctAYN: 'CT 스캔',
        hvmriAYN: 'MRI',
        hvangioAYN: '혈관촬영기'
    };
    return equipmentLabels[key] || '알 수 없는 장비';
};

const getEquipmentCount = (eqData, key) => {
    const countMapping = {
        hvventiAYN: 'hvs30',
        hvventisoAYN: 'hvs31',
        hvinCUAYN: 'hvs32',
        hvcrrTAYN: 'hvs33',
        hvecmoAYN: 'hvs34',
        hvhypoAYN: 'hvs35',
        hvoxyAYN: 'hvs37',
        hvctAYN: 'hvs27',
        hvmriAYN: 'hvs28',
        hvangioAYN: 'hvs29'
    };
    return eqData[countMapping[key]] || 0;
};

const EquipmentStatusModal = ({ isOpen, onClose, hospitalId }) => {
    const [eqData, setEqData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isOpen || !hospitalId) return;

        const fetchEqData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/hospital/detail?hospitalid=${hospitalId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('장비 정보를 가져오는데 실패했습니다.');
                }

                const data = await response.json();
                setEqData(data.result.equipmentId);
            } catch (error) {
                console.error('장비 데이터 조회 실패:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEqData();
    }, [hospitalId, isOpen]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <S.ModalOverlay onClick={onClose}>
            <S.Modal onClick={(e) => e.stopPropagation()}>
                <S.ModalTitle>장비 정보</S.ModalTitle>
                <S.ModalContent>
                    {loading && <div>로딩 중...</div>}
                    {error && <div>데이터 로드 실패</div>}
                    {!loading && !error && eqData && (
                        <S.EquipmentGrid>
                            {Object.entries(eqData)
                                .filter(([key]) => key.includes('AYN'))
                                .map(([key]) => (
                                    <S.EquipmentItem key={key}>
                                        <S.EquipmentLabel>
                                            {getEquipmentLabel(key)}
                                        </S.EquipmentLabel>
                                        <S.EquipmentStatus available={eqData[key]}>
                                            {eqData[key]
                                                ? `${getEquipmentCount(eqData, key)}대 보유`
                                                : '사용 불가능'}
                                        </S.EquipmentStatus>
                                    </S.EquipmentItem>
                                ))}
                        </S.EquipmentGrid>
                    )}
                </S.ModalContent>
                <S.CloseButton onClick={onClose}>
                    닫기
                </S.CloseButton>
            </S.Modal>
        </S.ModalOverlay>,
        document.body
    );
};

export default EquipmentStatusModal;