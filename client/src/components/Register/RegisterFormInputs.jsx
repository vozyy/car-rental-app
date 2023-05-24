import React from 'react';
import styles from './RegisterFormInput.module.css';

function RegisterFormInputs(props) {
  const { label, id, errorMessage, onChange, placeholder, ...inputProps } =
    props;

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
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </>
  );
}

export default RegisterFormInputs;
