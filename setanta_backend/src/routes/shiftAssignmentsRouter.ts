// shiftAssignmentsRouter.ts
import express, { Router } from 'express';
import { getShiftAssignments } from '../services/shiftAssignmentsService';

const router: Router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', async (_req, res) => {
  try {
    const shiftAssignments = await getShiftAssignments();
    res.json(shiftAssignments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
