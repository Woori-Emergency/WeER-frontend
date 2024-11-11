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
  const [idAvailable, setIdAvailable] = useState(false); // ID 중복 체크 상태
  const [emailAvailable, setEmailAvailable] = useState(false); // 이메일 중복 체크 상태

  // ID 중복 체크 비동기 함수
  const checkIdAvailability = async (loginId) => {
    try {
      const response = await fetch(`http://localhost:8080/auth/check-login-id?loginId=${loginId}`);
      const isAvailable = await response.json();
      setIdAvailable(isAvailable); // 서버 응답에 따라 ID 중복 여부 설정
    } catch (error) {
      console.error("ID 중복 체크 오류:", error);
    }
  };

  // 이메일 중복 체크 비동기 함수
  const checkEmailAvailability = async (email) => {
    try {
      const response = await fetch(`http://localhost:8080/auth/check-email?email=${email}`);
      const isAvailable = await response.json();
      setEmailAvailable(isAvailable); // 서버 응답에 따라 이메일 중복 여부 설정
      console.error("이메일중복여부 : ", isAvailable);
    } catch (error) {
      console.error("이메일 중복 체크 오류:", error);
    }
  };

  // Form 제출 후 호출되는 함수 (회원가입)
  const onFinish = (values) => {
    // 서버에 회원가입 요청 (동기 방식)
    const signupData = {
      loginId: values.loginId,
      name: values.name,
      email: values.email,
      password: values.password,
      tel: values.tel,
      certificate: values.certificate,
      organization: values.organization,
    };

    // 회원가입 API 호출 (비동기 요청은 아니지만, 여기서 처리)
    fetch('http://localhost:8080/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('회원가입 실패');
        }
      })
      .then((data) => {
        alert('회원가입 성공!');
        navigate('/'); // 회원가입 성공 후 리다이렉트
      })
      .catch((error) => {
        alert('회원가입 중 오류가 발생했습니다.');
        console.error(error);
      });
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
          {/* ID 입력 필드 */}
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
            onBlur={(e) => checkIdAvailability(e.target.value)} // ID 입력 시 중복 체크
          >
            <Input />
          </Form.Item>
          {idAvailable && (
            <div style={{ color: 'red', fontSize: '12px' }}>이 ID는 이미 사용 중입니다.</div>
          )}

          {/* 이메일 입력 필드 */}
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
                    message: '이메일을 입력해 주세요!',
                    whitespace: true,
                },
            ]}
            onBlur={(e) => checkEmailAvailability(e.target.value)} // 이메일 입력 시 중복 체크
        >
            <Input />
        </Form.Item>
        {emailAvailable && (
            <div style={{ color: 'red', fontSize: '12px' }}>이 이메일은 이미 사용 중입니다.</div>
        )}
          {/* 나머지 폼 항목들... */}
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

          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ fontSize: '18px', height: '50px', backgroundColor: '#E97132' }}
              disabled={idAvailable || emailAvailable} // 중복 체크가 완료되지 않으면 버튼 비활성화
            >
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default SignupPage;
  