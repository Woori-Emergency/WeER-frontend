import React, { useState } from 'react';
import styled from 'styled-components';
import { formatDate } from '../../utils/dateUtils';
import { getAuthHeaders } from '../api/config';
import * as S from './PatientInfoCard.styles';
import { Spin } from 'antd';

const getAgeGroupText = (ageGroup) => {
  const ageGroupMap = {
   'UNKNOWN': '알 수 없음',
   'INFANT_TODDLER': '영유아',
   'TEEN': '10대',
   'TWENTIES': '20대',
   'THIRTIES': '30대',
   'FORTIES': '40대',
   'FIFTIES': '50대',
   'SIXTIES': '60대',
   'SEVENTIES_PLUS': '70대 이상'
 };
 return ageGroupMap[ageGroup] || ageGroup;
};

const PatientInfoCard = ({ patient, onCompleted }) => {
  // patient의 상태를 초기값으로 사용
  const [isCompleted, setIsCompleted] = useState(patient.status === 'COMPLETED');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckIcon, setShowCheckIcon] = useState(false);

  const handleComplete = async () => {
    try {
      setShowModal(false);
      setIsLoading(true);
      setShowCheckIcon(true);
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/hospital/patient/${patient.patientconditionid}/complete`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
      });
  
      if (!response.ok) {
        throw new Error('이송 완료 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error details:', error);
      alert(error.message);
    } finally{
      setTimeout(() => {
        setIsCompleted(true);
        // setShowModal(false);
        if (onCompleted) {
          onCompleted();
        }
        setIsLoading(false); // 로딩 종료
        window.location.reload(); // 현재 페이지 새로고침하여 상태 초기화
      }, 870);
    }
  };



  return (
    <S.Card>
      <S.CardHeader>
      <S.CardTitleSection>
        <S.CardTitle>현재 이송중인 환자</S.CardTitle>
        <S.TransportInfo>이송 시작: {formatDate(patient.startTime)}</S.TransportInfo>
      </S.CardTitleSection> 
      {!isCompleted && (
          <S.CompleteButton
            isLoading={isLoading}
            onClick={() => setShowModal(true)}
            disable={isLoading}
            style={{
              background: isLoading ? 'transparent' : '', // 로딩 중 투명 배경
              border: isLoading ? 'none' : '', // 로딩 중 테두리 제거
              pointerEvents: isLoading ? 'none' : 'auto', // 로딩 중 클릭 차단
              boxShadow: isLoading ? 'none' : '',
            }}
            >
              {isLoading ? (
                <img 
                src = "/images/check3.gif"
                style={{ width: '250%', height: '250%' }} />
              ) : '이송 완료'}
          </S.CompleteButton>
      )}
    </S.CardHeader>

      {showModal && (
        <S.ModalOverlay>
          <S.ModalContent>
            <S.ModalTitle>이송 완료 확인</S.ModalTitle>
            <p>정말 이송을 완료하시겠습니까?</p>
              <S.ModalButtons>
              <S.ModalButton onClick={() => setShowModal(false)}>
                취소
              </S.ModalButton>
              <S.ModalButton primary onClick={handleComplete}>
                확인
              </S.ModalButton>
            </S.ModalButtons>
          </S.ModalContent>
        </S.ModalOverlay>
      )}

      <S.CardContent>
        <S.InfoGrid>
          <S.InfoCard>
            <S.InfoLabel>성별</S.InfoLabel>
            <S.InfoValue>
              {patient.gender === 'MALE' ? '남성' :
                patient.gender === 'FEMALE' ? '여성' : '미상'}
            </S.InfoValue>
          </S.InfoCard>
          
          <S.InfoCard>
            <S.InfoLabel>연령대</S.InfoLabel>
            <S.InfoValue>
              {getAgeGroupText(patient.ageGroup)}
            </S.InfoValue>
          </S.InfoCard>
          
          <S.InfoCard>
            <S.InfoLabel>진료 구분</S.InfoLabel>
            <S.InfoValue>
              {patient.medical === 'DISEASE' ? '질병' : '질병 외'}
            </S.InfoValue>
          </S.InfoCard>
          
          <S.InfoCard>
            <S.InfoLabel>의식 수준</S.InfoLabel>
            <S.InfoValue>{patient.consciousnessLevel}</S.InfoValue>
          </S.InfoCard>
          
          <S.InfoCard color="#fee2e2">
            <S.InfoLabel>혈압</S.InfoLabel>
            <S.InfoValue>{patient.bloodPressure} mmHg</S.InfoValue>
          </S.InfoCard>
          
          <S.InfoCard color="#ffedd5">
            <S.InfoLabel>맥박</S.InfoLabel>
            <S.InfoValue>{patient.heartRate} bpm</S.InfoValue>
          </S.InfoCard>
          
          <S.InfoCard color="#fef3c7">
            <S.InfoLabel>체온</S.InfoLabel>
            <S.InfoValue>{patient.temperature}°C</S.InfoValue>
          </S.InfoCard>
          
          <S.InfoCard color="#dbeafe">
            <S.InfoLabel>호흡수</S.InfoLabel>
            <S.InfoValue>{patient.respiration} /min</S.InfoValue>
          </S.InfoCard>
        </S.InfoGrid>
      </S.CardContent>
    </S.Card>
  );
};

export default PatientInfoCard;