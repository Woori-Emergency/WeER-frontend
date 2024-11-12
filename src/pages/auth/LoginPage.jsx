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
    const savedLoginId = localStorage.getItem('savedLoginId');
    const savedAutoLogin = JSON.parse(localStorage.getItem('autoLogin'));

    if (savedAutoLogin && savedLoginId) {
      console.log('자동 로그인 중...');
      navigate('/dashboard');
    }
  }, [navigate]);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  
    const loginData = {
      loginId: values.loginId,
      password: values.password,
    };
  
    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((error) => {
            throw new Error(error.message || '로그인 실패');
          });
        }
      })
      .then((data) => {
        console.log('Login successful', data);
  
        if (rememberMe) {
          sessionStorage.setItem('savedLoginRole', data);
        } else {
          sessionStorage.removeItem('savedLoginId');
        }

        if (autoLogin) {
          sessionStorage.setItem('autoLogin', true);
        } else {
          sessionStorage.removeItem('autoLogin');
        }
  
        if (data.role === "User") {
          navigate('/');
        } else if (data.role === "Admin") {
          navigate('/admin/dashboard');
        } else if (data.role === "Hospital") {
          navigate('/hospital-booking-list');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        alert(error.message || '로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      });
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh'
    }}>
      <Col xs={22} sm={16} md={12} lg={10} xl={8} style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '20px' }}>
          <img 
            src="/weer_logo.png"
            alt="WeER Logo"
            style={{ 
              height: '60px',
              width: 'auto',
              cursor: 'pointer'
            }} 
            onClick={() => navigate('/')}
          />
        </div>
        
        {/* <Title level={2} style={{ marginBottom: '30px' }}>
          로그인
        </Title> */}
        
        <Form
          name="login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          style={{
            maxWidth: '100%',
          }}
        >
          <Form.Item
            name="loginId"
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
            <Input 
              prefix={<UserOutlined />} 
              placeholder="아이디" 
              style={{ fontSize: '16px', padding: '12px' }} 
            />
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
            <Input 
              prefix={<LockOutlined />} 
              type="password" 
              placeholder="비밀번호" 
              style={{ fontSize: '16px', padding: '12px' }} 
            />
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
                <a onClick={() => navigate('/auth/forgot-password')} style={{ color: '#E97132' }}>
                  비밀번호를 잊으셨나요?
                </a>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              style={{ 
                fontSize: '18px', 
                height: '50px', 
                backgroundColor: '#E97132' 
              }}
            >
              로그인
            </Button>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              또는 <a onClick={() => navigate('/signup')} style={{ color: '#E97132' }}>지금 회원가입</a>
            </div>
          </Form.Item>
        </Form>
      </Col>
    </div>
  );
};

export default LoginPage;