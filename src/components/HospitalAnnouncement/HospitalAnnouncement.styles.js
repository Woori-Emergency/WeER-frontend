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