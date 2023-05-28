import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createToken = (tokenDetails) => {
  tokenDetails = {
    id: tokenDetails.id,
    email: tokenDetails.email,
  };
  // TODO: add expiration back
  return jwt.sign(tokenDetails, process.env.TOKEN_SECRET);
};

export default createToken;
