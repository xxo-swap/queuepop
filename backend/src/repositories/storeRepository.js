// repositories/storeRepository.js
import pool from "../../db/db.js";

export const StoreRepository = {
  async createStore({ storeName, email, contact, address, chainId }, client = null) {
    const db = client || pool;

    const query = `
      INSERT INTO stores (
        name,
        email,
        phone,
        address,
        chain_id
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [storeName, email, contact, address, chainId];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async getStoreById(storeId, client = null) {
    const db = client || pool;
    const query = `SELECT * FROM stores WHERE id = $1`;
    const result = await db.query(query, [storeId]);
    return result.rows[0];
  },
};
