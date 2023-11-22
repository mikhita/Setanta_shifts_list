export interface QueryResult<T> {
  rows: T[];
}

export interface YourRowType {
  now: Date; 
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  lastlogin: string; 
  vacation: boolean;
}

export interface Weekday {
  dayId: number;
  dayOfWeek: string;
  month: number;
  year: number;
  isweeknd: boolean;
}

export interface Shift {
  shiftId: number;
  shiftName: string;
  duration: string;
}

export interface ShiftAssignment {
  employeeName: string;
  dayOfWeek: string;
  shiftName: string;
  vacation: boolean;
}


export interface AuthToken {
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ErrorResponse {
  message: string;
}


