import jwt from 'jsonwebtoken';
import { hash, compare } from 'bcryptjs';
export { default as requireAuthentication } from './requireAuthentication'
export { validateEmail, validatePassword, validateSignUp } from './validate';

export const generateToken = async (email: string) => {
  return await jwt.sign({ email }, process.env.JWT_PRIVATE_KEY, { expiresIn: 12000 });
}
export const hashPassword = async (password: string) => {
  return await hash(password, 12)
}
export const comparePassword = async (password, password2) => {
  return await compare(password, password2);
}