import bcrypt from 'bcrypt';
import { Employee } from '../types';
import { pool } from '../db';

export const registerUser = async (user: Employee): Promise<void> => {
  const { firstName, lastName, email, password } = user;

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed Password:', hashedPassword);

  const lastLogin = new Date();

  await pool.query(
    'INSERT INTO employees (firstName, lastName, email, password, isAdmin, lastLogin, vacation) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [firstName, lastName, email, hashedPassword, false, lastLogin, false]
  );
};

