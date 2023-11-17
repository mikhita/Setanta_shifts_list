import { Pool as PgPool, QueryResult } from 'pg';
import { YourRowType } from './types';
import dotenv from 'dotenv';
import { parseDbPassword } from './utils';


dotenv.config();
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

if (!process.env.DB_PASSWORD) {
  console.error('DB_PASSWORD is not defined in the environment.');
  process.exit(1);
}

console.log('Attempting to connect to PostgreSQL...');

const password = parseDbPassword(process.env.DB_PASSWORD);

console.log(typeof password);


const pool = new PgPool({
  user: 'postgres',
  host: 'localhost',
  database: 'setanta_shifts',
  password: 'mishkinaz',
  port: 5432,
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


