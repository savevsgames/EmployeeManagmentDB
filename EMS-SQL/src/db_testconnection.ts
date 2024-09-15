import { query } from "./db.ts";

const testConnection = async () => {
  try {
    const result = await query("SELECT NOW()");
    console.log("PostgreSQL connected:", result.rows);
  } catch (err) {
    console.error("Connection failed:", err);
  }
};

testConnection();
