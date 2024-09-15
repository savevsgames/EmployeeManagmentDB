import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ems_db",
  password: "pgAdmin",
  port: 5432, // default port for PostgreSQL
});

export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    client.release();
  }
};
