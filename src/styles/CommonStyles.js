// styles/CommonStyles.js
import styled from 'styled-components';

export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  position: relative;

  @media (max-width: 1280px) {
    max-width: 1000px;
  }

  @media (max-width: 1024px) {
    max-width: 90%;
    padding: 30px;
  }

  @media (max-width: 768px) {
    max-width: 95%;
    padding: 20px;
  }
`;

export const ContentWrapper = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const TopContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

export const ActionButton = styled.button`
  flex: 1;
  padding: 15px 20px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  color: #333;

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const CenteredContent = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
min-height: 60vh;
width: 100%;
`;
