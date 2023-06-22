import * as yup from 'yup';
import User from '../db/models/user';
import bcrypt from 'bcrypt';

export const registrationSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('Valid email required'),
  password: yup
    .string()
    .min(8)
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
      message:
        'password must be at least 8 characters long and contain at least 1 number and 1 special character',
    })
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const validateRegistration = async (schema, registrationCredentials) => {
  try {
    await schema.validate(registrationCredentials, { abortEarly: false });
    return null;
  } catch (error) {
    return { error: error.message };
  }
};

export const validateLogin = async (userEmail, userPassword) => {
  const user = await User.findOne({ email: userEmail });
  if (!user || !(await bcrypt.compare(userPassword, user.password))) {
    throw new Error('Invalid email or password');
  }

  return user;
};

export default { registrationSchema, validateRegistration, validateLogin };
