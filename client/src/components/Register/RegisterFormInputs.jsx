import React from 'react';

function RegisterFormInputs(props) {
  const { label, id, errorMessage, onChange, ...inputProps } = props;

  return (
    <>
      <div className='register-form-input'>
        <label htmlFor={id}>{label}: </label>
        <input {...inputProps} id={id} onChange={onChange} />
        <p className='register-input-error'>{errorMessage}</p>
      </div>
    </>
  );
}

export default RegisterFormInputs;
