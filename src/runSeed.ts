import { Pool } from "pg";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Initialize PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.PG_RENDER_DB_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Function to read and run the seeds.sql file
const runSeed = async () => {
  const seedFilePath = path.join(__dirname, "../sql_commands/seeds.sql");
  const seedSQL = fs.readFileSync(seedFilePath, "utf8");

  try {
    console.log("Running seed data...");
    await pool.query(seedSQL);
    console.log("Seed data loaded successfully.");
  } catch (error) {
    console.error("Error loading seed data:", error);
  } finally {
    await pool.end();
  }
};

// Execute the function
runSeed();
