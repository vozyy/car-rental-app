const validateLoginInput = async (schema, inputValues) => {
  try {
    await schema.validate(inputValues, { abortEarly: false });
    return null;
  } catch (err) {
    return err;
  }
};

export default validateLoginInput;
