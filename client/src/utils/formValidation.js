const validateLoginInput = async (schema, inputValues) => {
  try {
    await schema.validate(inputValues, { abortEarly: false });
    return null;
    // setErrorMessage(null);
    // setShowErrorMessage(false);
  } catch (err) {
    return err;
  }
};

export default validateLoginInput;
