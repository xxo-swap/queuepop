// src/db/checkDb.js
import pool from "./db.js";

export async function checkDbConnection() {
  try {
    const res = await pool.query("SELECT version(), current_database(), current_user;");
    console.log("🟢 Database info:", res.rows[0]);
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }


  
}
