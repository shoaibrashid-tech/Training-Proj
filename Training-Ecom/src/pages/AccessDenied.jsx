import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';

export default function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center p-6">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={[
          <Button type="primary" key="home" onClick={() => navigate('/')}>
            Back Home
          </Button>,
          <Button key="login" onClick={() => navigate('/login')}>
            Log In
          </Button>
        ]}
      />
    </div>
  );
}