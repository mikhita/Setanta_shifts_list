import express, { Request, Response, Router } from 'express';
import { createShiftAssignment, getShiftAssignments } from '../services/shiftAssignmentsService';

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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', async (_req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { employeeName, dayOfWeek, shiftName } = _req.body;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await createShiftAssignment(employeeName, dayOfWeek, shiftName);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    res.status(201).json({ message: 'Shift assignment created successfully' });
  } catch (error) {
    console.error('Error creating shift assignment:', error);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
