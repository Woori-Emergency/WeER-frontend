import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가

import {
  AutoComplete,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from 'antd';
const { Option } = Select;
const { Title } = Typography;

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select
      style={{
        width: 70,
      }}
    >
      <Option value="82">+82</Option>
    </Select>
  </Form.Item>
);

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
  },
};

const SignupPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate(); // useNavigate 추가

  // Form 제출 후 호출되는 함수
  const onFinish = async (values) => {
    try {
      // 회원가입 데이터 준비
      const signupData = {
        loginId: values.loginId,
        name: values.name,
        email: values.email,
        password: values.password,
        tel: values.tel,
        certificate: values.certificate,
        organization: values.organization,
      };
  
      // fetch를 사용하여 회원가입 API 호출
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });
  
      if (response.ok) {
        const data = await response.json();
        const redirectUrl = JSON.parse(data).redirectUrl;
        navigate(redirectUrl); // 회원가입 성공 후 리다이렉트
      } else {
        alert('회원가입 실패');
      }
    } catch (error) {
      alert('회원가입 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '70vh', padding: '10px' }}>
      <Col xs={24} sm={16} md={12} lg={10} xl={8}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
          회원가입
        </Title>
        <Form
          {...formItemLayout}
          form={form}
          name="signup"
          onFinish={onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '82',
          }}
          style={{
            maxWidth: '100%',
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
          scrollToFirstError
        >
          <Form.Item
            name="loginId"
            label="아이디"
            tooltip="ID는 5~13자 이하여야 합니다."
            rules={[
              {
                required: true,
                message: 'ID를 입력해주세요.',
                whitespace: true,
              },
              {
                pattern: /^[a-zA-Z0-9]*$/,
                message: '특수문자 사용 불가',
              },
              {
                validator: (_, value) =>
                  value && value.length >= 8 && value.length <= 13
                    ? Promise.resolve()
                    : Promise.reject(new Error('ID는 8자 이상, 13자 이하로 입력해주세요!')),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="name"
            label="이름"
            tooltip="본인의 실명을 입력해주세요."
            rules={[
              {
                required: true,
                message: '이름을 입력해주세요.',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: '유효하지 않은 이메일입니다.',
              },
              {
                required: true,
                message: '이메일을 입력해주새요!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="비밀번호"
            rules={[
              {
                required: true,
                message: '비밀번호를 입력해주세요!',
                whitespace: true,
              },
              {
                validator: (_, value) =>
                  value && value.length >= 8 && value.length <= 15
                    ? Promise.resolve()
                    : Promise.reject(new Error('비밀번호는 8자 이상, 15자 이하로 입력해주세요!')),
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="비밀번호 확인"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '비밀번호를 확인해주세요!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('입력하셨던 비밀번호와 틀립니다!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="tel"
            label="핸드폰 번호"
            rules={[
              {
                required: true,
                message: '전화번호를 입력해주세요!',
                whitespace: true,
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

          <Form.Item
            name="certificate"
            label="자격증 번호"
            tooltip="응급구조사, 의사, 간호사 자격증 한정"
            rules={[
              {
                required: true,
                message: '자격증의 자격번호를 입력해주세요',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="organization"
            label="소속 기관"
            tooltip="현재 자신이 근무하는 병원명을 적어주세요"
            rules={[
              {
                required: true,
                message: '소속 기관을 입력해주세요',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="" style={{ color: '#E97132' }}>agreement</a>
            </Checkbox>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" block style={{ fontSize: '18px', height: '50px', backgroundColor: '#E97132' }}>
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default SignupPage;
