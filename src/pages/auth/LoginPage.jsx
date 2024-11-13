import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Row, Col, Typography } from 'antd';

const { Title } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const accessToken = localStorage.getItem('accessToken'); // localStorage에서 token 가져오기
  const refreshToken = localStorage.getItem('refreshToken');
  const role = localStorage.getItem('role');

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

    // Send login request using fetch
    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(error => {
          throw error; // 에러 객체를 그대로 throw
        });
      }
      return response.json();
    })
      .then((data) => {
        console.log('Login successful', data);

        // 서버에서 받은 JWT 토큰을 로컬 스토리지에 저장
        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          localStorage.setItem('role', data.role);
          
        }

        // 로그인 성공 시 세션 스토리지 처리
        if (rememberMe) {
          sessionStorage.setItem('savedLoginRole', data);
        } else {
          sessionStorage.removeItem('savedLoginId');
        }

        if (autoLogin) {
          localStorage.setItem('autoLogin', true);

        } else {
          localStorage.removeItem('autoLogin');
        }
        console.log(data.role)
        // 역할에 따라 리디렉션
        switch(data.role) {
          case "MEMBER":
            navigate('/');
            break;
          case "ADMIN":
            navigate('/admin/users');
            break;
          case "HOSPITAL_ADMIN":
            navigate('/hospital-booking-list');
            break;
          default:
            navigate('/');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        alert(error.message || '로그  인 중 오류가 발생했습니다. 다시 시도해주세요.');
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