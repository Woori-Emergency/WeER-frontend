import React, { useState } from 'react';
import './css/PatientStatusPage.css';

const PatientStatusPage = () => {
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
    // 폼 유효성 검사
  if (!validateForm()) {
    return;
  }

  try {
    // FormData를 DTO 형식에 맞게 변환
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

    // API 요청 보내기
    // userId는 실제 사용자 ID로 변경
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

    // 성공 상태 설정
    setSubmitStatus({
      type: 'success',
      message: data.message || '환자 상태가 성공적으로 등록되었습니다.'
    });

    // 폼 초기화 또는 다른 작업 수행
    // setFormData(initialFormData);

  } catch (error) {
    // 에러 상태 설정
    setSubmitStatus({
      type: 'error',
      message: error.message || '서버 오류가 발생했습니다.'
    });
  }
};

  return (
    <div className="patient-page">
      <div className="form-container">
        <h2 className="page-title">환자 상태 입력란</h2>

        {submitStatus.message && (
          <div className={`status-message ${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="patient-form">
          <div className="form-group">
            <label>성별</label>
            <div className="gender-buttons">
              {[
                { value: 'UNKNOWN', label: '성별 미상' },
                { value: 'FEMALE', label: '여성' },
                { value: 'MALE', label: '남성' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleInputChange('gender', option.value)}
                  className={`gender-button ${formData.gender === option.value ? 'active' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>연령대</label>
            <select
              value={formData.ageGroup}
              onChange={(e) => handleInputChange('ageGroup', e.target.value)}
              className={errors.ageGroup ? 'error' : ''}
            >
              <option value="UNKNOWN">나이 미상</option>
              <option value="INFANT_TODDLER">영유아</option>
              <option value="TEEN">10대</option>
              <option value="TWENTIES">20대</option>
              <option value="THIRTIES">30대</option>
              <option value="FORTIES">40대</option>
              <option value="FIFTIES">50대</option>
              <option value="SIXTIES">60대</option>
              <option value="SEVENTIES_PLUS">70대 이상</option>
            </select>
            {errors.ageGroup && <p className="error-message">{errors.ageGroup}</p>}
          </div>

          {[
            { field: 'bloodPress', label: '혈압', placeholder: '예: 120/80' },
            { field: 'heartRate', label: '맥박', placeholder: '예: 60' },
            { field: 'bodyTemp', label: '체온', placeholder: '예: 36.5' },
            { field: 'respiration', label: '호흡수', placeholder: '예: 12' }
          ].map((input) => (
            <div key={input.field} className="form-group">
              <label>{input.label}</label>
              <input
                type="text"
                value={formData[input.field]}
                onChange={(e) => handleInputChange(input.field, e.target.value)}
                placeholder={input.placeholder}
                className={errors[input.field] ? 'error' : ''}
              />
              {errors[input.field] && <p className="error-message">{errors[input.field]}</p>}
            </div>
          ))}

          <div className="form-group">
            <label>진료 구분</label>
            <div className="disease-status-buttons">
              {[
                { value: 'DISEASE', label: '질병' },
                { value: 'NON-DISEASE', label: '질병 외' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleInputChange('diseaseStatus', option.value)}
                  className={`disease-status-button ${formData.diseaseStatus === option.value ? 'active' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>의식 수준</label>
            <div className="consciousnessLevel-buttons">
              {[
                { value: 'ALERT', label: 'A' },
                { value: 'VERBAL', label: 'V' },
                { value: 'PAIN', label: 'P' },
                { value: 'UNRESPONSIVE', label: 'U' }
              ].map((type) => (
                <label key={type.value} className="checkbox-label">
                  <input
                    type="checkbox"
                    name="consciousnessLevel"
                    value={type.value}
                    checked={formData.consciousnessLevel === type.value}
                    onChange={(e) => handleInputChange('consciousnessLevel', e.target.value)}
                  />
                  <span>{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-button">
            저장하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientStatusPage;