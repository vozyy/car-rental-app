import React from 'react';
import styles from './Login.module.css';
import LoginForm from './LoginForm';

function Login() {
  return (
    <div className={styles['login-container']}>
      <h1 className={styles['login-header']}>
        Get back behind the steering wheel.
      </h1>
      <LoginForm />
    </div>
  );
}

export default Login;
