export interface QueryResult<T> {
  rows: T[];
}

export interface YourRowType {
  now: Date; 
}

export interface Employee {
  employeeId: number;
  name: string;
}

export interface Weekday {
  dayId: number;
  dayOfWeek: string;
}

export interface Shift {
  shiftId: number;
  shiftName: string;
}

export interface ShiftAssignment {
  employeeName: string;
  dayOfWeek: string;
  shiftName: string;
}
