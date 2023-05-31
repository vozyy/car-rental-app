import React from 'react';
import RegisterForm from './RegisterForm';
import styles from './Register.module.css';
import AsideContent from '../../components/AsideContent';

function Register() {
  return (
    <>
      <header className={styles['register-page-img']}></header>
      <h1 className={styles['register-page-header']}>
        Discover. <br /> Roam. <br /> Return. <br />
      </h1>
      <section className={styles['register-main-content-container']}>
        <AsideContent
          iconName='car'
          content='Enjoy convenience at your doorstep with our car rentals app—have
            your chosen vehicle delivered right to your home!'
        />
        <AsideContent
          iconName='house'
          content='Enjoy convenience at your doorstep with our car rentals app—have
            your chosen vehicle delivered right to your home!'
        />
        <AsideContent
          iconName='car-burst'
          content='Enjoy convenience at your doorstep with our car rentals app—have
            your chosen vehicle delivered right to your home!'
        />
      </section>
      <div>
        <RegisterForm />
      </div>
      <div className={styles['empty']}></div>
    </>
  );
}

export default Register;
