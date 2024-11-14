import React from 'react';
import * as S from './PatientStatusForm.styles';


const validateBloodPressure = (value) => {
  if (!value) return '';
  
  const number = Number(value);
  
  if (!Number.isInteger(number)) {
    return '정수만 입력 가능합니다';
  }
  
  return '';
};

const validateHeartRate = (value) => {
  if (!value) return '';
  
  const number = Number(value);
  
  if (!Number.isInteger(number)) {
    return '정수만 입력 가능합니다';
  }
  
  return '';
};

const validateBodyTemp = (value) => {
  if (!value) return '';

  
  const temp = Number(value);
  
  // 소수점 첫째 자리까지만 허용 체크
  if (!/^\d+(\.\d)?$/.test(temp)) {
    return '소수점 첫째 자리까지만 입력 가능합니다';
  }
  
  return '';
};

const validateRespiration = (value) => {
  if (!value) return '';
  
  const respRate = Number(value);

  if (!Number.isInteger(respRate)) {
    return '정수만 입력 가능합니다';
  }
  
  return '';
};

const PatientStatusForm = ({ 
  formData, 
  errors, 
  submitStatus, 
  handleInputChange, 
  handleSubmit 
}) => {
  const handleFieldChange = (field, value) => {
    let error = '';
    
    switch (field) {
      case 'bloodPress':
        error = validateBloodPressure(value);
        break;
      case 'heartRate':
        error = validateHeartRate(value);
        break;
      case 'bodyTemp':
        error = validateBodyTemp(value);
        break;
      case 'respiration':
        error = validateRespiration(value);
        break;
      default:
        break;
    }
    
    if (!error || !value) {
      handleInputChange(field, value);
    }
  };

  const handleKeyPress = (e, field) => {
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
    
    // 체온: 숫자와 소수점(.) 만 허용
    if (field === 'bodyTemp') {
      if (!/[\d.]/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    // 그 외 : 숫자만 허용 
    } else {
      if (!/\d/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    }
  };

  return (
    <S.FormContainer>
      <S.PageTitle>환자 상태 입력란</S.PageTitle>

      {submitStatus.message && (
        <S.StatusMessage type={submitStatus.type}>
          {submitStatus.message}
        </S.StatusMessage>
      )}

      <S.Form onSubmit={handleSubmit}>
        <S.FormGroup>
          <S.Label>성별</S.Label>
          <S.GenderButtonGroup>
            {[
              { value: 'UNKNOWN', label: '성별 미상' },
              { value: 'FEMALE', label: '여성' },
              { value: 'MALE', label: '남성' }
            ].map((option) => (
              <S.GenderButton
                key={option.value}
                type="button"
                onClick={() => handleInputChange('gender', option.value)}
                active={formData.gender === option.value}
              >
                {option.label}
              </S.GenderButton>
            ))}
          </S.GenderButtonGroup>
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>연령대</S.Label>
          <S.Select
            value={formData.ageGroup}
            onChange={(e) => handleInputChange('ageGroup', e.target.value)}
            error={errors.ageGroup}
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
          </S.Select>
          {errors.ageGroup && <S.ErrorMessage>{errors.ageGroup}</S.ErrorMessage>}
        </S.FormGroup>

        {[
          { field: 'bloodPress', label: '혈압', placeholder: '예: 120/80' },
          { field: 'heartRate', label: '맥박', placeholder: '예: 60' },
          { field: 'bodyTemp', label: '체온', placeholder: '예: 36.5' },
          { field: 'respiration', label: '호흡수', placeholder: '예: 12' }
        ].map((input) => (
          <S.FormGroup key={input.field}>
            <S.Label>{input.label}</S.Label>
            <S.Input
              type="text"
              value={formData[input.field]}
              onChange={(e) => handleFieldChange(input.field, e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, input.field)}
              placeholder={input.placeholder}
              error={errors[input.field]}
            />
            {errors[input.field] && <S.ErrorMessage>{errors[input.field]}</S.ErrorMessage>}
          </S.FormGroup>
        ))}

        <S.FormGroup>
          <S.Label>진료 구분</S.Label>
          <S.DiseaseButtonGroup>
            {[
              { value: 'DISEASE', label: '질병' },
              { value: 'NON_DISEASE', label: '질병 외' }
            ].map((option) => (
              <S.DiseaseButton
                key={option.value}
                type="button"
                onClick={() => handleInputChange('diseaseStatus', option.value)}
                active={formData.diseaseStatus === option.value}
              >
                {option.label}
              </S.DiseaseButton>
            ))}
          </S.DiseaseButtonGroup>
        </S.FormGroup>

        <S.FormGroup>
          <S.Label>의식 수준</S.Label>
          <S.ConsciousnessGroup>
            {[
              { value: 'ALERT', label: 'A' },
              { value: 'VERBAL', label: 'V' },
              { value: 'PAIN', label: 'P' },
              { value: 'UNRESPONSIVE', label: 'U' }
            ].map((type) => (
              <S.CheckboxLabel key={type.value}>
                <input
                  type="checkbox"
                  name="consciousnessLevel"
                  value={type.value}
                  checked={formData.consciousnessLevel === type.value}
                  onChange={(e) => handleInputChange('consciousnessLevel', e.target.value)}
                />
                <span>{type.label}</span>
              </S.CheckboxLabel>
            ))}
          </S.ConsciousnessGroup>
        </S.FormGroup>

        <S.SubmitButton type="submit">
          저장하기
        </S.SubmitButton>
      </S.Form>
    </S.FormContainer>
  );
};

export default PatientStatusForm;