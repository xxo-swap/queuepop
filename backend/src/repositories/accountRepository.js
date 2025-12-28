// repositories/accountRepository.js
import pool from "../../db/db.js";

export const AccountRepository = {
  async createAccount({ storeName, businessType }, client = null) {
    const db = client || pool; // Use the transaction client if provided

    const query = `
      INSERT INTO chains (name, business_type)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [storeName, businessType];

    const result = await db.query(query, values);
    return result.rows[0];
  },
};
