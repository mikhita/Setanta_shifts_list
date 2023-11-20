import { Pool as PgPool, QueryResult } from 'pg';
import { YourRowType } from './types';
import dotenv from 'dotenv';
import { parseDbPassword } from './utils';


dotenv.config();


if (!process.env.DB_PASSWORD || !process.env.DB_USER || !process.env.DB_HOST || !process.env.DB_DATABASE) {
  console.error('Database configuration is incomplete.');
  process.exit(1);
}

const password = parseDbPassword(process.env.DB_PASSWORD);
console.log(password, typeof password);


export const pool = new PgPool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: password,
  port: Number(process.env.DB_PORT) || 5432, 
});

pool.query('SELECT NOW()', (err: Error, result: QueryResult<YourRowType>) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL:', result.rows[0].now);
  }
});

export const connectToDatabase = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};



