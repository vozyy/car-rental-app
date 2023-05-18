import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createToken = (tokenDetails) => {
  tokenDetails = {
    id: tokenDetails.id,
    email: tokenDetails.email,
  };
  return jwt.sign(tokenDetails, process.env.TOKEN_SECRET, { expiresIn: '30m' });
};

export default { createToken };
