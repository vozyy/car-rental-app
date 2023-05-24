import React from 'react';
import RegisterForm from '../../components/Register/RegisterForm';
import styles from './Register.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

function Register() {
  return (
    <>
      <div className={styles['register-page-img']}></div>
      <h1 className={styles['register-page-header']}>
        Discover. <br /> Roam. <br /> Return. <br />
      </h1>
      <div className={styles['register-main-content-container']}>
        <div className={styles['content-box']}>
          <span>
            <FontAwesomeIcon icon={icon({ name: 'car' })} />
          </span>
          <p>
            Enjoy convenience at your doorstep with our car rentals app—have
            your chosen vehicle delivered right to your home!
          </p>
        </div>
        <div className={styles['content-box']}>
          <span>
            <FontAwesomeIcon icon={icon({ name: 'house' })} />
          </span>
          <p>
            Convenience continues even after your rental period ends. We pick up
            the car hassle-free at your address!
          </p>
        </div>
        <div className={styles['content-box']}>
          <span>
            <FontAwesomeIcon icon={icon({ name: 'car-burst' })} />
          </span>
          <p>
            Drive with confidence knowing that every car in our fleet comes with
            comprehensive insurance coverage, keeping you fully protected.
          </p>
        </div>
      </div>
      <div>
        <RegisterForm />
      </div>
      <div className={styles['empty']}></div>
    </>
  );
}

export default Register;
