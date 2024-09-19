import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const localPool = new Pool({
  connectionString: process.env.LOCAL_DATABASE_URL, // Use the Render connection string
});

export const query = async (text: string, params?: any[]) => {
  const client = await localPool.connect();
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

export default localPool;
