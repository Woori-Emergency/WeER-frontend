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
  form,
  ...restProps
}) => {
  let inputNode;

  if (dataIndex === 'name') {
    inputNode = (
      <Input 
        maxLength={50}
        onKeyPress={(e) => {
          const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+/;
          if (specialChars.test(e.key)) {
            e.preventDefault();
          }
        }}
      />
    );
  } else if (dataIndex === 'tel') {
    inputNode = (
      <Form.Item
        name={dataIndex}
        style={{ margin: 0 }}
        rules={[
          {
            required: true,
            message: `${title}을(를) 입력해주세요!`,
          }
        ]}
        getValueFromEvent={(e) => {
          let value = e.target.value;
          
          // 숫자만 추출
          value = value.replace(/[^\d]/g, '');
          
          // 숫자가 11자리를 넘지 않도록
          value = value.slice(0, 11);
          
          // 숫자 길이에 따라 하이픈 추가
          if (value.length <= 3) {
            return value;
          } else if (value.length <= 7) {
            return `${value.slice(0, 3)}-${value.slice(3)}`;
          } else {
            return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`;
          }
        }}
        normalize={(value) => {
          if (!value) return value;
          
          // 이미 올바른 형식이면 그대로 반환
          if (/^\d{3}-\d{4}-\d{4}$/.test(value)) {
            return value;
          }
          
          // 숫자만 추출
          const numbers = value.replace(/[^\d]/g, '');
          
          // 형식에 맞게 반환
          if (numbers.length <= 3) return numbers;
          if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
          return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
        }}
      >
        <Input
          maxLength={13}
          onKeyPress={(e) => {
            // 숫자만 입력 가능하도록
            const regex = /[0-9]/;
            if (!regex.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
      </Form.Item>
    );
  } else if (dataIndex === 'organization') {
    inputNode = (
      <Input 
        maxLength={100}
        onKeyPress={(e) => {
          const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+/;
          if (specialChars.test(e.key)) {
            e.preventDefault();
          }
        }}
      />
    );
  } else {
    inputNode = <Input />;
  }

  return (
    <td {...restProps} style={{ textAlign: 'center' }}>
      {editing ? (
        dataIndex === 'tel' ? inputNode : (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `${title}을(를) 입력해주세요!`,
              }
            ]}
          >
            {inputNode}
          </Form.Item>
        )
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
    const formattedData = users.map((user, index) => ({
      ...user,
      key: user.userId || index,
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
      userId: record.userId,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      
      // 이름 특수문자 체크
      const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+/;
      if (specialChars.test(row.name)) {
        message.error('이름에 특수문자를 포함할 수 없습니다.');
        return;
      }
  
      // 전화번호 형식 체크
      const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
      if (!phoneRegex.test(row.tel)) {
        message.error('전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)');
        return;
      }
  
      // 소속기관 특수문자 체크
      if (specialChars.test(row.organization)) {
        message.error('소속기관명에 특수문자를 포함할 수 없습니다.');
        return;
      }
  
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      const token = localStorage.getItem('accessToken');
  
      if (index > -1) {
        const item = newData[index];
        const updatedItem = { ...item, ...row };
        newData.splice(index, 1, updatedItem);
        setData(newData);
        setEditingKey('');
  
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/update/${key}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: row.name,
            tel: row.tel,
            organization: row.organization,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update user');
        }
  
        message.success('사용자 정보가 수정되었습니다.');
      }
    } catch (errInfo) {
      console.error('Update Failed:', errInfo);
      message.error('사용자 정보 수정에 실패했습니다.');
    }
  };
  
  const handleDelete = async (key) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/approve-signup/${key}?approve=UNAPPROVED`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
  
      setData(data.filter(item => item.key !== key));
      message.success('사용자가 삭제되었습니다.');
    } catch (error) {
      console.error('Delete Failed:', error);
      message.error('사용자 삭제에 실패했습니다.');
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
          <span>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
              style={{ color: '#E97132', marginRight: '8px' }}
            >
              수정
            </Typography.Link>
            <Popconfirm 
              title="정말 삭제하시겠습니까?" 
              onConfirm={() => handleDelete(record.key)}
            >
              <Typography.Link
                disabled={editingKey !== ''}
                style={{ color: '#E97132' }}
              >
                삭제
              </Typography.Link>
            </Popconfirm>
          </span>
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
        title: col.title.props.children,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <CustomPagination>
        <style>
          {`
            .editable-row td {
              padding: 16px !important;
            }
            .editable-row .ant-form-item {
              margin: 0;
            }
            .ant-form-item-explain-error {
              font-size: 12px;
              color: #ff4d4f;
              min-height: 24px;
              padding-top: 4px;
            }
            td.ant-table-cell {
              padding: 8px !important;
            }
            .ant-form-item-has-error .ant-input {
              border-color: #ff4d4f;
            }
            .ant-form-item-has-error .ant-input:hover {
              border-color: #ff7875;
            }
          `}
        </style>
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