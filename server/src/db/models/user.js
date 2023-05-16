import mongoose from 'mongoose';

// Step1
// here I create the User model --> how should a user object look like
// NEXT --> userServices.js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

export default User;
