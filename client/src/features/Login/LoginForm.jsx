import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginFormInputs from './LoginFormInputs';
import loginInputs from '../../components/LoginInputs';
import { loginSchema } from '../../utils/formValidationSchema';
import validateFormInput from '../../utils/formValidation';
import { debounce } from 'lodash';
import styles from './LoginForm.module.css';

function LoginForm() {
  const navigate = useNavigate();

  const [loginValues, setLoginValues] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setLoginValues({ ...loginValues, [name]: value });
    setShowErrorMessage(true);
  };

  useEffect(() => {
    const validateInput = debounce(async () => {
      if (!showErrorMessage) {
        return;
      }
      const validationError = await validateFormInput(loginSchema, loginValues);
      setErrorMessage(
        validationError ? validationError.inner[0].message : null
      );
    }, 500);
    validateInput();
  }, [showErrorMessage, loginValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorMessage) {
      alert('cannot proceed, please check your credentials');
    } else {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginValues),
          }
        );
        const responseBody = await response.json();
        if (response.status === 200) {
          const { token, userId, userEmail } = responseBody;

          navigate('/');
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId);
          localStorage.setItem('email', userEmail);
        } else {
          setErrorMessage(responseBody.error);
        }
      } catch (error) {
        setErrorMessage(error);
      }
    }
  };

  const rednerLoginFormInputs = () =>
    loginInputs.map((input, i) => (
      <LoginFormInputs
        key={i}
        id={input.name}
        value={loginValues[input.name]}
        {...input}
        onChange={handleChange}
      />
    ));

  return (
    <div className={styles['login-form-container']}>
      <form onSubmit={handleSubmit} className={styles['login-form']}>
        {rednerLoginFormInputs()}
        {errorMessage && (
          <p className={styles['login-input-error']}>{errorMessage}</p>
        )}
        <button className={styles['login-submit-btn']}>Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;
