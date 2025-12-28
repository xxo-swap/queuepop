// repositories/userRepository.js
import pool from "../../db/db.js";

export const UserRepository = {
  async createUser({ name, email, passwordHash, role, accountId, storeId }, client = null) {
    const db = client || pool;

    const query = `
      INSERT INTO users (name, email, password_hash, role, chain_id, store_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, name, email, role, chain_id, store_id;
    `;

    const values = [name, email, passwordHash, role, accountId, storeId];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async getUserByEmail(email, client = null) {
    const db = client || pool;
    try {
      const query = `SELECT * FROM users WHERE email = $1`;
      const result = await db.query(query, [email]);
      return result.rows[0];
    } catch (err) {
      err.message = `getUserByEmail failed: ${err.message}`;
      throw err;
    }
  },
};
