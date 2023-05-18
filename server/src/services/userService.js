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
      return { error: validationError.error };
    }

    const dbUser = await User.findOne({
      email: userCredentials.email,
    });

    if (dbUser) {
      return { error: 'Email already in use' };
    }

    userCredentials.password = await bcrypt.hash(userCredentials.password, 10);
    const newUser = new User(userCredentials);
    await newUser.save();
    return { message: 'Registration successful' };
  } catch (error) {
    return { error: error.message };
  }
};

export default createUser;
