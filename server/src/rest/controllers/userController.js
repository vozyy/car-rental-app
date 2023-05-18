import userService from '../../services';

const register = async (req, res) => {
  const result = await userService.createUser(req.body);
  result.error
    ? res.status(400).json({ error: result.error })
    : res.json(result);
};

export default {
  register,
};
