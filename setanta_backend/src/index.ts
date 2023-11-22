import express from 'express';
import employeeRouter from './routes/employeeRouter';
import weekdaysRouter from './routes/weekdaysRouter';
import shiftsRouter from './routes/shiftsRouter';
import shiftAssignmentsRouter from './routes/shiftAssignmentsRouter';
import { connectToDatabase } from './db';
import { dbConnectMiddleware } from './middlewears/dbConnectMiddleware';
import authRouter from './routes/authRouter';
import registrationRouter from './routes/registrationRouter';


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
app.use('/auth', authRouter);
app.use('/registration', registrationRouter);


const PORT = process.env.PORT || 3000;

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.use(dbConnectMiddleware);






app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




