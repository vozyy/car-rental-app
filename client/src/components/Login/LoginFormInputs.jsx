import React from 'react';
import styles from './LoginFormInputs.module.css';

function LoginFormInputs(props) {
  const { label, id, errorMessage, onChange, ...inputProps } = props;

  return (
    <>
      <div className={styles['login-input-container']}>
        <label htmlFor={id}>{label} </label>
        <input {...inputProps} id={id} onChange={onChange} />
        <p>{errorMessage}</p>
      </div>
    </>
  );
}

export default LoginFormInputs;
