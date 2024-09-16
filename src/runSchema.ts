import { Pool } from "pg";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.PG_RENDER_DB_CONNECTION_STRING, // Schema setup
  ssl: {
    rejectUnauthorized: false,
  },
});

// Function to run the schema creation script
const runSchema = async () => {
  const schemaSQL = fs.readFileSync(
    path.join(__dirname, "../sql_commands/schema.sql"),
    "utf8"
  );

  try {
    console.log("Running schema...");
    await pool.query(schemaSQL);
    console.log("Schema created successfully.");
  } catch (error) {
    console.error("Error running schema:", error);
  } finally {
    await pool.end();
  }
};

runSchema();
