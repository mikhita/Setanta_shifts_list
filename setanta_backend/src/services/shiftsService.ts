import { QueryResult } from 'pg';
import { Shift } from '../types';
import { pool } from '../db';



export const getShifts = async (): Promise<Shift[]> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result: QueryResult<Shift> = await pool.query('SELECT * FROM Shifts');
    return result.rows;
  } catch (error) {
    throw error;
  }
};
