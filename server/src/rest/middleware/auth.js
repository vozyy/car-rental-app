import jwt from 'jsonwebtoken';
import exceptionPath from './exceptionPath';

const checkToken = async (req, res, next) => {
  const currentPath = req.path;
  if (exceptionPath.includes(currentPath)) {
    return next();
  }
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'Missing token' });
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ error: 'Token expired' });
      return res.end();
    }
    res.status(401).json({ error: 'Invalid token' });
    return next(error.message);
  }
};

export default checkToken;
