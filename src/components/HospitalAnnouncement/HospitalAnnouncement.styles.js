import styled from 'styled-components';

export const HospitalHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

export const HospitalTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #333;
`;

export const CustomPagination = styled.div`
  width: 100%;

  .ant-table-pagination.ant-pagination {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 16px 0;
  }

  .ant-pagination-item-active a {
    color: #E97132 !important;
  }

  .ant-pagination-item-active {
    border-color: #E97132 !important;
  }

  .ant-pagination-item a {
    color: #E97132;
  }

  .ant-pagination-item:hover a {
    color: #E97132;
  }

  .ant-pagination-item:hover {
    border-color: #E97132;
  }

  .ant-pagination-prev, .ant-pagination-next {
    color: #E97132;
  }

  .ant-pagination-prev:hover .ant-pagination-item-link,
  .ant-pagination-next:hover .ant-pagination-item-link {
    color: #E97132 !important;
    border-color: #E97132 !important;
  }
`;

export const PageHeader = styled.div`
  font-size: 14px;
  color: #666;
`;

export const RefreshIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-image: url('/images/back.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;  /* 클릭 가능함을 보여주는 커서 */
  role: button;  /* 스크린리더를 위한 버튼 역할 명시 */
  aria-label: "이전 페이지로 돌아가기";  /* 접근성을 위한 설명 */
  
  &:hover {
    opacity: 0.7;  /* 호버 효과 추가 */
  }
`;