import express from 'express';
import employeeRouter from './routes/employeeRouter';
import weekdaysRouter from './routes/weekdaysRouter';
import shiftsRouter from './routes/shiftsRouter';
import shiftAssignmentsRouter from './routes/shiftAssignmentsRouter';
import { connectToDatabase } from './db';
import { getShifts } from './services/shiftsService';
import { dbConnectMiddleware } from './middlewears/dbConnectMiddleware';


void connectToDatabase();

const app = express();

app.use(express.json());

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/employees', employeeRouter);
app.use('/weekdays', weekdaysRouter);
app.use('/shifts', shiftsRouter);
app.use('/shift-assignments', shiftAssignmentsRouter);

const PORT = process.env.PORT || 3000;

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.use(dbConnectMiddleware);


// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/shifts', async (_req, res) => {
  try {
    const shifts = await getShifts();
    res.json(shifts);
  } catch (error) {
    console.error('Error retrieving shifts:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




