// db/pool.js
import dotenv from "dotenv";
dotenv.config();
import pkg from "pg";
const { Pool } = pkg;

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default db;
