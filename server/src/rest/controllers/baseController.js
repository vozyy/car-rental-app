import user from '../../services/userService';

// Here I just import the user I created an instance of na send it in the resBody

const get = (req, res) => {
  //res.send('This is the RentCars backend');
  res.send(user);
};

export default {
  get,
};
