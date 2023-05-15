import React, { useEffect, useState } from 'react';
import LoginFormInputs from './LoginFormInputs';
import LoginInputs from './LoginInputs';
import userSchema from '../../utils/formValidationSchema';
import validateLoginInput from '../../utils/formValidation';

function LoginForm() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setShowErrorMessage(true);
  };

  useEffect(() => {
    const validateInput = async () => {
      if (!showErrorMessage) {
        return;
      }
      const validationError = await validateLoginInput(userSchema, values);
      if (validationError) {
        setErrorMessage(validationError.inner[0].message);
      } else {
        setErrorMessage(null);
      }
    };
    validateInput();
  }, [showErrorMessage, values]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const rednerLoginFormInputs = () =>
    LoginInputs.map((input, i) => (
      <LoginFormInputs
        key={i}
        id={input.name}
        value={values[input.name]}
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
