import React from 'react';
import RegisterForm from '../../components/Register/RegisterForm';
import styles from './Register.module.css';

function Register() {
  return (
    <>
      <div className={styles['register-page-img']}></div>
      <div className={styles['register-page-slogan']}>
        Discover. <br /> Roam. Return. <br />
      </div>
      <RegisterForm />
    </>
  );
}

export default Register;
