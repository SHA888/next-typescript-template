import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('Testing database connection...');
    const client = await pool.connect();
    console.log('Successfully connected to the database');

    // Test query
    const result = await client.query('SELECT $1::text as message', [
      'Database connection successful!',
    ]);
    console.log('Query result:', result.rows[0].message);

    // List tables
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);

    console.log('Tables in the database:');
    console.table(tables.rows);

    client.release();
  } catch (err) {
    console.error('Error connecting to the database:', err);
  } finally {
    await pool.end();
  }
}

testConnection().catch(console.error);
