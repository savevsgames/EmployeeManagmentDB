import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

export const localPool = new Pool({
  user: process.env.LOCAL_PG_USER,
  host: process.env.LOCAL_PG_HOST,
  database: process.env.LOCAL_PG_DATABASE,
  password: process.env.LOCAL_PG_PASSWORD,
  port: Number(process.env.LOCAL_PG_PORT), // default port for PostgreSQL
});

// Set up the PostgreSQL connection pool using the connection string
const pool = new Pool({
  connectionString: process.env.PG_RENDER_DB_CONNECTION_STRING, // Use the Render connection string
  ssl: {
    rejectUnauthorized: false, // This allows self-signed certificates
  },
});

// console.log("PG_USER:", process.env.LOCAL_PG_USER);
// console.log("PG_PASSWORD:", process.env.LOCAL_PG_PASSWORD);
// console.log("PG_HOST:", process.env.LOCAL_PG_HOST);
// console.log("PG_DATABASE:", process.env.LOCAL_PG_DATABASE);
// console.log("PG_PORT:", process.env.LOCAL_PG_PORT);

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
