// auth.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;
const secretKey = 'your-secret-key';

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match;
};

export const generateToken = (userId: string): string => {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  return token;
};

export const verifyToken = (token: string): any => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
