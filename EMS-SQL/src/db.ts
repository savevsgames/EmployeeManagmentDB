import { Pool } from "pg";

const pool = new Pool({
  user: "ems_db_k7ff_user",
  host: "dpg-crj8o93v2p9s738rrvkg-a",
  database: "ems_db_k7ff",
  password: process.env.POSTGRES_PW,
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
