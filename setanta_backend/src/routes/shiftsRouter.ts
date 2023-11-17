// shiftsRouter.ts
import express, { Router } from 'express';
import { getShifts } from '../services/shiftsService';

const router: Router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', async (_req, res) => {
  try {
    const shifts = await getShifts();
    res.json(shifts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
