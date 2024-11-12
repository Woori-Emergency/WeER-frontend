import React from 'react';
import { Table, Typography } from 'antd';
import { CustomPagination } from './HospitalAnnouncement.styles';

const HospitalAnnouncement = ({ data, loading }) => {
  const columns = [
    {
      title: <div style={{ textAlign: 'center' }}>메시지 구분</div>,
      dataIndex: 'messageType',
      width: '15%',
      render: (text) => (
        <Typography.Text style={{ 
          color: text === '진료불가 메시지' ? '#E97132' : 'inherit',
          fontWeight: text === '진료불가 메시지' ? 'bold' : 'normal'
        }}>
          {text}
        </Typography.Text>
      )
    },
    {
      title: <div style={{ textAlign: 'center' }}>구분</div>,
      dataIndex: 'department',
      width: '15%',
    },
    {
      title: <div style={{ textAlign: 'center' }}>메시지 내용</div>,
      dataIndex: 'content',
      width: '50%',
    },
    {
      title: <div style={{ textAlign: 'center' }}>등록일시</div>,
      dataIndex: 'timestamp',
      width: '20%',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <CustomPagination style={{ width: '100%' }}>
        <Table
          components={{
            body: {
              cell: ({ children, ...restProps }) => (
                <td {...restProps} style={{ textAlign: 'center' }}>
                  {children}
                </td>
              ),
            },
          }}
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            position: ['bottomCenter'],
            pageSize: 10,
            style: { marginTop: 16 }
          }}
          bordered
          style={{ width: '100%' }}
        />
      </CustomPagination>
    </div>
  );
};

export default HospitalAnnouncement;