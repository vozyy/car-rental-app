const get = (req, res) => {
  console.log(req.oidc.isAuthenticated());
  res.send('This is the RentCars backend');
};

export default {
  get,
};
