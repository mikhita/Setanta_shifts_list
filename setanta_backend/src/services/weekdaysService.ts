import { QueryResult } from 'pg';
import { Weekday } from '../types';
import { pool } from '../db';



export const getWeekdays = async (): Promise<Weekday[]> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result: QueryResult<Weekday> = await pool.query('SELECT * FROM Weekdays');
    return result.rows;
  } catch (error) {
    throw error;
  }
};
