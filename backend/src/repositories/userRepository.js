import pool from '../../db/db.js';

export const UserRepository = {
  async createUser({ name, email, passwordHash, role, accountId, storeId }) {
    const query = `
      INSERT INTO users (name, email, password, role, accountid, storeid)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [name, email, passwordHash, role, accountId, storeId];

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async getUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }
};
