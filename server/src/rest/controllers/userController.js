import { userService } from '../../services';
import { validateLogin } from '../../services/validationService';
import createToken from '../../services/createToken';

const register = async (req, res) => {
  console.log(req.body);
  try {
    const result = await userService.createUser(req.body);
    res.status(result.error ? 400 : 201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await validateLogin(email, password);
    const userId = user.id;
    const userEmail = user.email;
    const token = createToken(user);
    res.json({ message: 'Login successful', token, userId, userEmail });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
};

export default {
  register,
  login,
};
