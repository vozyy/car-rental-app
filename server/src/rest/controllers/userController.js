import userService from '../../services';

const register = async (req, res) => {
  res.json(await userService.createUser(req.body));
};

export default {
  register,
};
