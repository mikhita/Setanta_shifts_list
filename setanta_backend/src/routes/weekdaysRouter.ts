// weekdaysRouter.ts
import express, { Router } from 'express';
import { getWeekdays } from '../services/weekdaysService';

const router: Router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', async (_req, res) => {
  try {
    const weekdays = await getWeekdays();
    res.json(weekdays);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
