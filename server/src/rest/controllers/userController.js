import userService from '../../services';

const register = async (req, res) => {
  try {
    const result = await userService.createUser(req.body);
    res.status(result.error ? 400 : 201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  register,
};
