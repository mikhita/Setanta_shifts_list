import { QueryResult } from 'pg';
import { Employee } from '../types';
import { pool } from '../db';



export const getEmployees = async (): Promise<Employee[]> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result: QueryResult<Employee> = await pool.query('SELECT * FROM Employees');
    return result.rows;
  } catch (error) {
    throw error;
  }
};
