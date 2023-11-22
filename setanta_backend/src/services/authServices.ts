import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Employee, AuthToken, ErrorResponse } from '../types';
import { pool } from '../db'; // Import your PostgreSQL connection pool

const SECRET_KEY = 'your-secret-key';

// Function to generate an authentication token
export const generateToken = (userId: number): AuthToken => {
  // Generate a JWT token with the user ID and a secret key
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
  // Return the token
  return { token };
};

// Function to handle user login and generate an authentication token
export const loginUser = async (email: string, password: string): Promise<AuthToken | ErrorResponse> => {
  try {
    // Query the database to retrieve the user with the provided email
    const result = await pool.query('SELECT * FROM employees WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      // If no user is found with the provided email, throw an error
      throw new Error('Invalid email or password');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user: Employee = result.rows[0];

    // Compare the provided password with the stored hashed password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      // If the password is not valid, throw an error
      throw new Error('Invalid email or password');
    }

    // If the password is valid, generate an authentication token
    const token = generateToken(user.id);
    // Return the authentication token
    return token;
  } catch (error) {
    // If an error occurs during the login process, log the error and return an error response
    console.error('Error during login:', error);
    return { message: 'Invalid email or password' };
  }
};
