import { Pool, QueryResult } from 'pg';
import { ShiftAssignment } from '../types';

const pool = new Pool();

export const getShiftAssignments = async (): Promise<ShiftAssignment[]> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result: QueryResult<ShiftAssignment> = await pool.query(`
      SELECT e.name AS employeeName, w.dayofweek, s.shiftname
      FROM ShiftAssignments sa
      JOIN Employees e ON sa.employeeid = e.employeeid
      JOIN Weekdays w ON sa.dayid = w.dayid
      JOIN Shifts s ON sa.shiftid = s.shiftid
    `);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
