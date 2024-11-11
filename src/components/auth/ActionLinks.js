// components/ActionLinks.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.span`
  margin: 0 8px;
  color: #ccc;
`;

const ActionLinks = () => {
  const navigate = useNavigate();

  return (
    <ButtonRow>
      <ActionButton onClick={() => navigate('/find-id')}>아이디 찾기</ActionButton>
      <Divider>|</Divider>
      <ActionButton onClick={() => navigate('/find-password')}>비밀번호 찾기</ActionButton>
      <Divider>|</Divider>
      <ActionButton onClick={() => navigate('/signup')}>회원가입</ActionButton>
    </ButtonRow>
  );
};

export default ActionLinks;
