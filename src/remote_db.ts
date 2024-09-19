import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

// Set up the PostgreSQL connection pool using the connection string
const pool = new Pool({
  connectionString: process.env.REMOTE_DATABASE_URL, // Use the Render connection string
  ssl: {
    rejectUnauthorized: false, // This allows self-signed certificates
  },
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

export default pool;
