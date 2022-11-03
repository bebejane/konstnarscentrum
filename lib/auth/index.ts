import jwt from 'jsonwebtoken';
import { hash, compare } from 'bcryptjs';
import requireAuthentication from './requireAuthentication'
import { validateEmail, validatePassword, validateSignUp } from './validate';

const generateToken = async (email) => {
  return await jwt.sign({ email }, process.env.JWT_PRIVATE_KEY, { expiresIn: 12000 });
}
const hashPassword = async (password) => {
  return await hash(password, 12)
}
const comparePassword = async (password, password2) => {
  return await compare(password, password2);
}
export {
  requireAuthentication,
  generateToken,
  hashPassword,
  validateEmail, 
  validatePassword, 
  validateSignUp,
  comparePassword
}