import styled from 'styled-components';
import { Button } from 'antd';

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
`;

export const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f5f5f5;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const UserName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

export const VerifiedBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-right: 6px;
`;

export const ProfileTypeButton = styled.button`
  border: 1px solid #e0e0e0;
  background: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

// 로그아웃 아이콘 버튼 스타일
export const LogoutIconButton = styled(Button)`
  border: none;
  background: transparent;
  color: #E97132;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    color: #d65f21;
  }
`;