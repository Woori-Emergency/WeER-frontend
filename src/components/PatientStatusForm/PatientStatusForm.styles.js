import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 24px;
  background-color: white;
  border-radius: 8px;
  margin: 0 auto; // 가로 중앙 정렬을 위해 추가
`;

export const PageTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 24px;
  color: #2B4570;
`;

export const StatusMessage = styled.div`
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  background-color: ${props => props.type === 'success' ? '#f0fdf4' : '#fef2f2'};
  border: 1px solid ${props => props.type === 'success' ? '#bbf7d0' : '#fecaca'};
  color: ${props => props.type === 'success' ? '#166534' : '#991b1b'};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #2B4570;
`;

export const GenderButtonGroup = styled.div`
  display: flex;
  gap: 2px;
  background-color: #f3f4f6;
  padding: 2px;
  border-radius: 8px;
`;

export const GenderButton = styled.button`
  flex: 1;
  padding: 8px 16px;
  border: none;
  background-color: ${props => props.active ? '#E97132' : 'white'};
  color: ${props => props.active ? 'white' : '#4b5563'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#d65f21' : '#f9fafb'};
  }
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid ${props => props.error ? '#D64045' : '#e5e7eb'};
  border-radius: 8px;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #E97132;
    box-shadow: 0 0 0 2px rgba(233, 113, 50, 0.2);
  }
`;

export const Select = styled.select`
  padding: 8px;
  border: 1px solid ${props => props.error ? '#D64045' : '#e5e7eb'};
  border-radius: 8px;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #E97132;
    box-shadow: 0 0 0 2px rgba(233, 113, 50, 0.2);
  }
`;

export const ErrorMessage = styled.p`
  color: #D64045;
  font-size: 14px;
  margin-top: 4px;
`;

export const DiseaseButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const DiseaseButton = styled.button`
  flex: 1;
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: ${props => props.active ? '#E97132' : 'none'};
  color: ${props => props.active ? 'white' : '#4b5563'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#d65f21' : '#f5f5f5'};
  }
`;

export const ConsciousnessGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  background-color: #f9fafb;
  padding: 12px;
  border-radius: 8px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  input[type="checkbox"] {
    accent-color: #7EB09B;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background-color: #E97132;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #d65f21;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(233, 113, 50, 0.2);
  }
`;