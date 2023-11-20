import { QueryResult } from 'pg';
import { ShiftAssignment } from '../types';
import { pool } from '../db';



export const getShiftAssignments = async (): Promise<ShiftAssignment[]> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result: QueryResult<ShiftAssignment> = await pool.query(`
    SELECT e.name AS employeeName, w.dayofweek, s.shiftname
    FROM shiftassignments sa
    JOIN employees e ON sa.employeeid = e.employeeid
    JOIN weekdays w ON sa.dayid = w.dayid
    JOIN shifts s ON sa.shiftid = s.shiftid;

    `);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

export const createShiftAssignment = async (employeeName: string, dayOfWeek: string, shiftName: string): Promise<void> => {
  const client = await pool.connect();

  try {
    // Get employee ID from the Employees table
    const employeeResult: QueryResult = await client.query('SELECT employeeid FROM employees WHERE name = $1', [employeeName]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const employeeId = employeeResult.rows[0]?.employeeid;

    if (!employeeId) {
      throw new Error(`Employee not found: ${employeeName}`);
    }

    // Get day ID from the Weekdays table
    const dayResult: QueryResult = await client.query('SELECT dayid FROM weekdays WHERE dayofweek = $1', [dayOfWeek]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dayId = dayResult.rows[0]?.dayid;

    if (!dayId) {
      throw new Error(`Day not found: ${dayOfWeek}`);
    }

    // Get shift ID from the Shifts table
    const shiftResult: QueryResult = await client.query('SELECT shiftid FROM shifts WHERE shiftname = $1', [shiftName]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const shiftId = shiftResult.rows[0]?.shiftid;

    if (!shiftId) {
      throw new Error(`Shift not found: ${shiftName}`);
    }

    // Insert the new shift assignment into the ShiftAssignments table
    await client.query('INSERT INTO shiftassignments(employeeid, dayid, shiftid) VALUES ($1, $2, $3)', [employeeId, dayId, shiftId]);
  } finally {
    client.release();
  }
};
