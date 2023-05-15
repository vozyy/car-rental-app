import * as yup from 'yup';

const userSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('valid email required'),
  password: yup
    .string()
    .min(8)
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
      message:
        'password must be at least 8 characters long and contain at least 1 number and 1 special character',
    })
    .required('password is required'),
});

export default userSchema;
