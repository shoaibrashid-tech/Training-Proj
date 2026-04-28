import React from 'react';
import { Button, Result } from 'antd';
import { useLocalizedNavigate } from '../hooks/useLocalizedNavigate';

export default function AccessDenied() {
  const localizedNavigate = useLocalizedNavigate();

  return (
    <div className="flex h-screen items-center justify-center p-6">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={[
          <Button type="primary" key="home" onClick={() => localizedNavigate('/')}>
            Back Home
          </Button>,
          <Button key="login" onClick={() => localizedNavigate('/login')}>
            Log In
          </Button>
        ]}
      />
    </div>
  );
}