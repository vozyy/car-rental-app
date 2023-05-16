import React, { useEffect, useState } from 'react';
import LoginFormInputs from './LoginFormInputs';
import loginInputs from './LoginInputs';
import { loginSchema } from '../../utils/formValidationSchema';
import validateFormInput from '../../utils/formValidation';
import { debounce } from 'lodash';

function LoginForm() {
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

  // TODO: implement login logic with my own API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorMessage) {
      alert('cannot proceed, login not corrent');
    } else {
      console.log(loginValues);
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
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        {rednerLoginFormInputs()}
        {errorMessage && <p>{errorMessage}</p>}
        <button>Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;
