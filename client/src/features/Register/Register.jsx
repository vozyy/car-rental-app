import React from 'react';
import RegisterForm from '../../components/Register/RegisterForm';
import styles from './Register.module.css';

function Register() {
  return (
    <>
      <div className={styles['register-page-img']}></div>
      <h1 className={styles['register-page-header']}>
        Discover. <br /> Roam. <br /> Return. <br />
      </h1>
      <h2 className={styles['register-page-subheader']}>
        Rent the car of your dreams with home delivery
      </h2>
      <RegisterForm />
    </>
  );
}

export default Register;
