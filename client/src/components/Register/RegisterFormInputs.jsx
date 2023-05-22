import React from 'react';
import styles from './RegisterFormInput.module.css';

function RegisterFormInputs(props) {
  const { label, id, errorMessage, onChange, ...inputProps } = props;

  return (
    <>
      <div className={styles['register-input-container']}>
        <label className={styles['register-form-label']} htmlFor={id}>
          {label}{' '}
        </label>
        <input
          className={styles['register-form-input']}
          {...inputProps}
          id={id}
          onChange={onChange}
        />
        <p className={styles['register-input-error']}>{errorMessage}</p>
      </div>
    </>
  );
}

export default RegisterFormInputs;
