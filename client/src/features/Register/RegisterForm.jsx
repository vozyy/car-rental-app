import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerInputs from '../../components/registerInputs';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorMessage) {
      alert('cannot proceed, please check your credentials');
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
        if (response.status === 201) {
          navigate('/login');
        } else {
          setErrorMessage(response.error);
        }
      } catch (error) {
        setErrorMessage(error);
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
