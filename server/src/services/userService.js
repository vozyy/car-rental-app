import User from '../db/models/user';

// here I import the User model and create an instance of it called user
// I assign the users all the properties required
// NEXT --> baseController

const user = new User({
  name: 'david',
  email: 'gm@gm.com',
});

export default user;
