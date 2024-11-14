export const API_BASE_URL = 'http://localhost:8080';

export const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('인증 토큰이 없습니다.');
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};