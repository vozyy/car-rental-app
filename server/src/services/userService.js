import User from '../db/models/user';
import bcrypt from 'bcrypt';
import {
  validateRegistration,
  registrationSchema,
} from '../services/validationService';

const createUser = async (userCredentials) => {
  try {
    const validationError = await validateRegistration(
      registrationSchema,
      userCredentials
    );

    if (validationError) {
      return { message: validationError.error };
    }

    const dbUser = await User.findOne({
      email: userCredentials.email,
    });

    if (dbUser) {
      return { message: 'Email already in use' };
    } else {
      userCredentials.password = await bcrypt.hash(
        userCredentials.password,
        10
      );

      const newUser = new User(userCredentials);
      await newUser.save();

      return { message: 'Registration successful' };
    }
  } catch (error) {
    return { message: error.message };
  }
};

export default createUser;
