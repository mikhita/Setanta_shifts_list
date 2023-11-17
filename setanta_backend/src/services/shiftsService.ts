import { Pool, QueryResult } from 'pg';
import { Shift } from '../types';

const pool = new Pool();

export const getShifts = async (): Promise<Shift[]> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result: QueryResult<Shift> = await pool.query('SELECT * FROM Shifts');
    return result.rows;
  } catch (error) {
    throw error;
  }
};
