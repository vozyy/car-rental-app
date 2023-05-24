import React from 'react';
import RegisterForm from '../../components/Register/RegisterForm';
import styles from './Register.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

function Register() {
  return (
    <>
      <header className={styles['register-page-img']}></header>
      <h1 className={styles['register-page-header']}>
        Discover. <br /> Roam. <br /> Return. <br />
      </h1>
      <section className={styles['register-main-content-container']}>
        <div className={styles['content-box']}>
          <span>
            <FontAwesomeIcon icon={icon({ name: 'car' })} />
          </span>
          <aside>
            Enjoy convenience at your doorstep with our car rentals app—have
            your chosen vehicle delivered right to your home!
          </aside>
        </div>
        <div className={styles['content-box']}>
          <span>
            <FontAwesomeIcon icon={icon({ name: 'house' })} />
          </span>
          <aside>
            Convenience continues even after your rental period ends. We pick up
            the car hassle-free at your address!
          </aside>
        </div>
        <div className={styles['content-box']}>
          <span>
            <FontAwesomeIcon icon={icon({ name: 'car-burst' })} />
          </span>
          <aside>
            Drive with confidence knowing that every car in our fleet comes with
            comprehensive insurance coverage, keeping you fully protected.
          </aside>
        </div>
      </section>
      <div>
        <RegisterForm />
      </div>
      <div className={styles['empty']}></div>
    </>
  );
}

export default Register;
