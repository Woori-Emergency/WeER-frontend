import React, { useState } from 'react';
import PatientStatusForm from '../../components/PatientStatusForm/PatientStatusForm';
import * as S from '../../components/PatientStatusForm/PatientStatusForm.styles';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;


const PatientStatusInputPage = () => {
  const [formData, setFormData] = useState({
    gender: 'UNKNOWN',
    ageGroup: 'UNKNOWN',
    bloodPress: '',
    heartRate: '',
    bodyTemp: '',
    respiration: '',
    diseaseStatus: 'DISEASE',
    consciousnessLevel: 'ALERT',
  });
  
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.ageGroup) {
      newErrors.ageGroup = '연령대를 선택해주세요';
    }
    
    if (!formData.gender) {
      newErrors.gender = '성별을 선택해주세요';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const patientData = {
        gender: formData.gender,
        ageGroup: formData.ageGroup,
        heartRate: formData.heartRate || null,
        bloodPressure: formData.bloodPress || null,
        temperature: formData.bodyTemp || null,
        respiration: formData.respiration|| null,
        consciousnessLevel: formData.consciousnessLevel,
        medical: formData.diseaseStatus
      };

      const response = await fetch('/hospital/patient?userId=1', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '서버 오류가 발생했습니다.');
      }

      setSubmitStatus({
        type: 'success',
        message: data.message || '환자 상태가 성공적으로 등록되었습니다.'
      });

    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message || '서버 오류가 발생했습니다.'
      });
    }
  };

  return (
    <ContentWrapper>
      <PatientStatusForm
        formData={formData}
        errors={errors}
        submitStatus={submitStatus}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </ContentWrapper>
  );
};

export default PatientStatusInputPage;