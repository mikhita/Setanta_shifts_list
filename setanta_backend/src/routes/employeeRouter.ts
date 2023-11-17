// employeeRouter.ts
import express, { Router } from 'express';
import { getEmployees } from '../services/employeeService';

const router: Router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', async (_req, res) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
