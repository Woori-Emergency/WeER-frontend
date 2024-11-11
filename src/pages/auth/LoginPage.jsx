import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col, Typography } from 'antd';

const { Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem('savedUsername');
    const savedAutoLogin = JSON.parse(localStorage.getItem('autoLogin'));

    if (savedAutoLogin && savedUsername) {
      console.log('자동 로그인 중...');
      navigate('/dashboard');
    }
  }, [navigate]);

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
  
    const loginData = {
      loginId: values.loginId,
      password: values.password,
    };
  
    try {
      // Send login request using fetch
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful', data);
  
        if (rememberMe) {
          localStorage.setItem('savedUsername', values.loginId);
        } else {
          localStorage.removeItem('savedUsername');
        }
  
        if (autoLogin) {
          localStorage.setItem('autoLogin', true);
        } else {
          localStorage.removeItem('autoLogin');
        }
  
        // 리다이렉트 URL 받아오기
        const redirectUrl = JSON.parse(data).redirectUrl;
        navigate(redirectUrl); // 메인페이지로 리다이렉트
  
      } else {
        const error = await response.json();
        console.error('Login failed:', error.message);
        // 로그인 실패 메시지 표시
      }
    } catch (error) {
      console.error('Error during login:', error);
      // 네트워크 오류 처리
    }
  };
  

  return (
    <Row justify="center" align="middle" style={{ minHeight: '70vh', padding: '10px' }}>
      <Col xs={24} sm={16} md={12} lg={10} xl={8}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '30px' }}>
          로그인
        </Title>
        <Form
          name="login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          style={{
            maxWidth: '100%',
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '아이디를 입력해주세요!',
              },
              {
                validator: (_, value) =>
                  value && value.length >= 8 && value.length <= 15
                    ? Promise.resolve()
                    : Promise.reject(new Error('ID는 8자 이상, 15자 이하입니다!')),
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="아이디" style={{ fontSize: '16px', padding: '12px' }} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '비밀번호를 입력해주세요!',
              },
              {
                validator: (_, value) =>
                  value && value.length >= 8 && value.length <= 15
                    ? Promise.resolve()
                    : Promise.reject(new Error('비밀번호는 8자 이상입니다!')),
              },
            ]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="비밀번호" style={{ fontSize: '16px', padding: '12px' }} />
          </Form.Item>

          <Form.Item style={{ marginBottom: '8px' }}>
            <Row justify="space-between" align="middle">
              <Col>
                <Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
                  아이디 기억하기
                </Checkbox>
              </Col>
              <Col>
                <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
                  자동 로그인
                </Checkbox>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item style={{ marginBottom: '8px' }}>
            <Row justify="end">
              <Col>
                <a onClick={() => navigate('/auth/forgot-password')} style={{ color: '#E97132' }}>비밀번호를 잊으셨나요?</a>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{ fontSize: '18px', height: '50px', backgroundColor: '#E97132' }}>
              로그인
            </Button>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              또는 <a onClick={() => navigate('/signup')} style={{ color: '#E97132' }}>지금 회원가입</a>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginPage;
