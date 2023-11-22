import express, { Router, Request, Response } from 'express';
import { Employee } from '../types';
import { registerUser } from '../services/registretionService';

const registrationRouter: Router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
registrationRouter.post('/register', async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const user: Employee = req.body;

  try {
    await registerUser(user);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default registrationRouter;
