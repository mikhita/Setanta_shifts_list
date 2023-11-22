import express, { Router, Request, Response } from 'express';
import { AuthToken, LoginCredentials, ErrorResponse } from '../types';
import { loginUser } from '../services/authServices';

const authRouter: Router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
authRouter.post('/login', async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { email, password }: LoginCredentials = req.body;

  try {
    // Pass email and password instead of the entire user object
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/no-unsafe-assignment
    const result: AuthToken | ErrorResponse = await loginUser(email, password);
    if ('token' in result) {
      res.status(200).json(result);
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default authRouter;
