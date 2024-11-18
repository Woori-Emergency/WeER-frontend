import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PatientStatusForm from '../../components/PatientStatusForm/PatientStatusForm';
import { getCurrentPatient } from '../../components/api/currentPatient';

const ContentWrapper = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;


const PatientStatusInputPage = () => {
  const navigate = useNavigate();
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
  const [hasExistingPatient, setHasExistingPatient] = useState(false);

  useEffect(() => {
    const checkCurrentPatient = async () => {
      try {
        await getCurrentPatient();
        setHasExistingPatient(true);
      } catch (error) {
        console.log('이송 중인 환자가 없습니다. 새로운 환자 정보를 입력할 수 있습니다.');
      }
    };

    checkCurrentPatient();
  }, []);

  useEffect(() => {
    if (hasExistingPatient) {
      alert('현재 이송 중인 환자가 있습니다!');
      navigate('/patient-status-list');
    }
  }, [hasExistingPatient, navigate]);
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
      const token = localStorage.getItem("accessToken"); // "accessToken"에서 "jwtToken"으로 변경
      console.log(token);
      if (!token) {
        throw new Error("로그인이 필요합니다.");
      }
  
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

      console.log(JSON.stringify(patientData));
  
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/hospital/patient`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // 수정된 토큰 사용
        },
        body: JSON.stringify(patientData)
      });
  
      if (!response.ok) {
        if (response.status === 401) {
          // 토큰이 만료되었거나 유효하지 않은 경우
          throw new Error("로그인이 만료되었습니다. 다시 로그인해주세요.");
        }
        const data = await response.json();
        throw new Error(data.message || '서버 오류가 발생했습니다.');
      }
  
      const data = await response.json();
      setSubmitStatus({
        type: 'success',
        message: data.message || '환자 상태가 성공적으로 등록되었습니다.'
      });


      alert('환자 상태가 성공적으로 등록되었습니다.');
      navigate('/patient-status-list');
  
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