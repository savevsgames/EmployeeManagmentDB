import { query } from "./db";

const testConnection = async () => {
  try {
    const result = await query("SELECT NOW()");
    console.log("PostgreSQL connected:", result.rows);
  } catch (err) {
    console.error("Connection failed:", err);
  }
};

testConnection();
