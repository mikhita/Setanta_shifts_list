// middleware/dbConnectMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { connectToDatabase } from '../db';

export const dbConnectMiddleware = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).send('Internal Server Error');
  }
};
