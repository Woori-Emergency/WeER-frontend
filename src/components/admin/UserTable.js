import { Form, Input, Popconfirm, Table, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CustomPagination = styled.div`
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

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />;
  return (
    <td
      {...restProps}
      style={{ textAlign: 'center' }}
    >
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const UserTable = ({ users, selectedUserIds, setSelectedUserIds }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');

  useEffect(() => {
    // users 데이터를 업데이트할 때 key 속성을 추가합니다.
    const formattedData = users.map((user, index) => ({
      ...user,
      key: user.loginId || index, // loginId가 고유한 키라고 가정
    }));
    setData(formattedData);
  }, [users]);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      loginId: record.loginId,
      name: record.name,
      tel: record.tel,
      organization: record.organization,
    });
    setEditingKey(record.key); // 편집할 레코드의 키를 설정하여 특정 행만 편집 모드로 전환
  };

  const cancel = () => {
    setEditingKey(''); // 편집 모드를 취소합니다.
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        const updatedItem = { ...item, ...row };
        newData.splice(index, 1, updatedItem);
        setData(newData);
        setEditingKey('');

        // loginId를 사용하여 API 요청 경로 설정
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/update-by-loginId/${key}`, { // URL에 loginId 사용
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: row.name,
            tel: row.tel,
            organization: row.organization,
          }),
        });
        message.success('User updated successfully!');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: <div style={{ textAlign: 'center' }}>아이디</div>,
      dataIndex: 'loginId',
      width: '20%',
      editable: false,
    },
    {
      title: <div style={{ textAlign: 'center' }}>이름</div>,
      dataIndex: 'name',
      width: '20%',
      editable: true,
    },
    {
      title: <div style={{ textAlign: 'center' }}>전화번호</div>,
      dataIndex: 'tel',
      width: '20%',
      editable: true,
    },
    {
      title: <div style={{ textAlign: 'center' }}>소속기관</div>,
      dataIndex: 'organization',
      width: '30%',
      editable: true,
    },
    {
      title: <div style={{ textAlign: 'center' }}>편집</div>,
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginInlineEnd: 8,
                color: '#E97132',
              }}
            >
              저장
            </Typography.Link>
            <Popconfirm title="취소하시겠습니까?" onConfirm={cancel}>
              <a style={{ color: '#E97132' }}>취소</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
            style={{ color: '#E97132' }}
          >
            수정
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <CustomPagination>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
            position: ["bottomCenter"],
          }}
        />
      </CustomPagination>
    </Form>
  );
};

export default UserTable;