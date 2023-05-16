import React, { useEffect, useState } from 'react';
import registerInputs from './RegisterInputs';
import RegisterFormInputs from './RegisterFormInputs';
import validateFormInput from '../../utils/formValidation';
import { registerSchema } from '../../utils/formValidationSchema';
import { debounce } from 'lodash';

function RegisterForm() {
  const [registerValues, setRegisterValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setRegisterValues({ ...registerValues, [name]: value });
    setShowErrorMessage(true);
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
      alert('cannot proceed, register values not valid');
    } else {
      console.log(registerValues);
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
    <div className='register-form'>
      <form onSubmit={handleSubmit}>
        {renderRegisterFormInputs()}
        {errorMessage && <p>{errorMessage}</p>}
        <button>Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;
