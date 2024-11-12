import React, {useState} from 'react';
import * as S from './HospitalCard.styles';


const HospitalCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
          <S.HospitalName>성심의료재단강동성심병원</S.HospitalName>
          <S.StatusInfo>
            <S.StatusDot />
            <span>상태:</span>
            <S.Distance>거리: 10KM</S.Distance>
          </S.StatusInfo>
        </S.HospitalInfo>
        <S.ButtonGroup>
        <S.InfoButton onClick={() => setIsModalOpen(true)}>장비 정보</S.InfoButton>
          <S.ReservationButton>예약 →</S.ReservationButton>
        </S.ButtonGroup>

        {isModalOpen && (
        <S.ModalOverlay onClick={() => setIsModalOpen(false)}>
          <S.Modal onClick={(e) => e.stopPropagation()}>
            <S.ModalTitle>장비 정보</S.ModalTitle>
            <S.ModalContent>
              <S.EquipmentGrid>
                <S.EquipmentItem>
                  <S.EquipmentLabel>인공호흡기 일반</S.EquipmentLabel>
                  <S.EquipmentStatus available={equipmentData.regularVentilator.available}>
                    {equipmentData.regularVentilator.available 
                      ? `${equipmentData.regularVentilator.count}대 사용 가능` 
                      : '사용 불가능'}
                  </S.EquipmentStatus>
                </S.EquipmentItem>
                
                <S.EquipmentItem>
                  <S.EquipmentLabel>인공호흡기 조산아용</S.EquipmentLabel>
                  <S.EquipmentStatus available={equipmentData.prematureVentilator.available}>
                    {equipmentData.prematureVentilator.available 
                      ? `${equipmentData.prematureVentilator.count}대 사용 가능` 
                      : '사용 불가능'}
                  </S.EquipmentStatus>
                </S.EquipmentItem>
                
                <S.EquipmentItem>
                  <S.EquipmentLabel>인큐베이터</S.EquipmentLabel>
                  <S.EquipmentStatus available={equipmentData.incubator.available}>
                    {equipmentData.incubator.available 
                      ? `${equipmentData.incubator.count}대 사용 가능` 
                      : '사용 불가능'}
                  </S.EquipmentStatus>
                </S.EquipmentItem>
                
                <S.EquipmentItem>
                  <S.EquipmentLabel>CRRT</S.EquipmentLabel>
                  <S.EquipmentStatus available={equipmentData.crrt.available}>
                    {equipmentData.crrt.available 
                      ? `${equipmentData.crrt.count}대 사용 가능` 
                      : '사용 불가능'}
                  </S.EquipmentStatus>
                </S.EquipmentItem>
                
                <S.EquipmentItem>
                  <S.EquipmentLabel>ECMO</S.EquipmentLabel>
                  <S.EquipmentStatus available={equipmentData.ecmo.available}>
                    {equipmentData.ecmo.available 
                      ? `${equipmentData.ecmo.count}대 사용 가능` 
                      : '사용 불가능'}
                  </S.EquipmentStatus>
                </S.EquipmentItem>
                
                <S.EquipmentItem>
                  <S.EquipmentLabel>중심체온조절 장치</S.EquipmentLabel>
                  <S.EquipmentStatus available={equipmentData.temperatureController.available}>
                    {equipmentData.temperatureController.available 
                      ? `${equipmentData.temperatureController.count}대 사용 가능` 
                      : '사용 불가능'}
                  </S.EquipmentStatus>
                </S.EquipmentItem>
                
                <S.EquipmentItem>
                  <S.EquipmentLabel>고압 산소 치료기</S.EquipmentLabel>
                  <S.EquipmentStatus available={equipmentData.hyperbaricChamber.available}>
                    {equipmentData.hyperbaricChamber.available 
                      ? `${equipmentData.hyperbaricChamber.count}대 사용 가능` 
                      : '사용 불가능'}
                  </S.EquipmentStatus>
                </S.EquipmentItem>
                
                <S.EquipmentItem>
                  <S.EquipmentLabel>CT 스캔</S.EquipmentLabel>
                  <S.EquipmentStatus available={equipmentData.ctScanner.available}>
                    {equipmentData.ctScanner.available 
                      ? `${equipmentData.ctScanner.count}대 사용 가능` 
                      : '사용 불가능'}
                  </S.EquipmentStatus>
                </S.EquipmentItem>
                
                <S.EquipmentItem>
                  <S.EquipmentLabel>MRI</S.EquipmentLabel>
                  <S.EquipmentStatus available={equipmentData.mri.available}>
                    {equipmentData.mri.available 
                      ? `${equipmentData.mri.count}대 사용 가능` 
                      : '사용 불가능'}
                  </S.EquipmentStatus>
                </S.EquipmentItem>
                
                <S.EquipmentItem>
                  <S.EquipmentLabel>혈관촬영기</S.EquipmentLabel>
                  <S.EquipmentStatus available={equipmentData.angiographer.available}>
                    {equipmentData.angiographer.available 
                      ? `${equipmentData.angiographer.count}대 사용 가능` 
                      : '사용 불가능'}
                  </S.EquipmentStatus>
                </S.EquipmentItem>
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

export default HospitalCard;