import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerInputs from './registerInputs';
import RegisterFormInputs from './RegisterFormInputs';
import validateFormInput from '../../utils/formValidation';
import { registerSchema } from '../../utils/formValidationSchema';
import { debounce } from 'lodash';
import styles from './RegisterForm.module.css';

function RegisterForm() {
  const navigate = useNavigate();

  const [registerValues, setRegisterValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setRegisterValues({ ...registerValues, [name]: value });
    setShowErrorMessage(true);
  };

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const validateInput = debounce(async () => {
      if (!showErrorMessage) {
        return;
      }

      const validationError = await validateFormInput(
        registerSchema,
        registerValues
      );
      setErrorMessage(
        validationError ? validationError.inner[0].message : null
      );
    }, 500);
    validateInput();
  }, [showErrorMessage, registerValues]);

  // TODO: implement login logic with my own API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorMessage) {
      alert('cannot proceed, credentials are not valid');
    } else {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/register`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerValues),
          }
        );
        const responseBody = await response.json();
        console.log(responseBody);
        navigate('/login');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderRegisterFormInputs = () =>
    registerInputs.map((input, i) => (
      <RegisterFormInputs
        key={i}
        id={input.name}
        value={registerValues.name}
        {...input}
        onChange={handleChange}
      />
    ));

  return (
    <>
      {!showForm ? (
        <button
          className={styles['register-modal-btn']}
          onClick={handleButtonClick}
        >
          Register
        </button>
      ) : (
        <div className={styles['modal']}>
          <div className={styles['overlay']} onClick={handleButtonClick}></div>
          <form className={styles['register-form']} onSubmit={handleSubmit}>
            {renderRegisterFormInputs()}
            {errorMessage && (
              <p className={styles['register-error-message']}>{errorMessage}</p>
            )}
            <button className={styles['register-submit-btn']}>Submit</button>
          </form>
        </div>
      )}
    </>
  );
}

export default RegisterForm;
