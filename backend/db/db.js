import dotenv from "dotenv";
dotenv.config();
import pkg from "pg";
const { Pool } = pkg;

// If your DATABASE_URL requires SSL (most hosted Postgres like Supabase do),
// we set ssl: { rejectUnauthorized: false }.
// Alternatively you can set PGSSLMODE=require in env, but setting ssl explicitly
// is explicit and works in Node environments.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE === "disable" ? false : { rejectUnauthorized: false },
});

export default pool;
