import React, { useState } from 'react';
import LoginFormInputs from './LoginFormInputs';
import inputs from './LoginInputs';
import userSchema from '../../services/formValidationService';

function LoginForm() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userSchema.validate(values, { abortEarly: false });
      setErrorMessage(null);
    } catch (err) {
      setErrorMessage(err.inner[0].message);
    }
  };

  const handleChange = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className='login-form'>
      <form onSubmit={handleSubmit}>
        {inputs.map((input, i) => (
          <LoginFormInputs
            key={i}
            id={input.name}
            value={values[input.name]}
            {...input}
            onChange={handleChange}
            errorMessage={input.error}
          />
        ))}
        {errorMessage && <p>{errorMessage}</p>}
        <button>Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;
