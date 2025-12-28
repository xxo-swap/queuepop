// orchestrators/authOrchestrator.js
import pool from "../../db/db.js";
import { UserRepository } from "../repositories/userRepository.js";
import { StoreRepository } from "../repositories/storeRepository.js";
import { AccountRepository } from "../repositories/accountRepository.js";
import bcrypt from "bcrypt";

export const AuthOrchestrator = {
  // 🔹 Register a new user + store + account in a single transaction
  async register({ name, email, password, storeName, contact, businessType, address }) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // 1️⃣ Check if user already exists
      const existing = await UserRepository.getUserByEmail(email, client);
      if (existing) throw new Error("User already exists");

      // 2️⃣ Create account (chain)
      const account = await AccountRepository.createAccount({ storeName, businessType }, client);

      // 3️⃣ Create store linked to account
      const newStore = await StoreRepository.createStore(
        { storeName, email, contact, address, chainId: account.id },
        client
      );

      // 4️⃣ Hash password and create admin user
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await UserRepository.createUser(
        { name, email, passwordHash, role: "ADMIN", accountId: account.id, storeId: newStore.id },
        client
      );

      await client.query("COMMIT");
      return { user, account, store: newStore };
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  },

  // 🔹 Fetch a user by email (optional transaction client)
  async getUserByEmail(email, client = null) {
    return await UserRepository.getUserByEmail(email, client);
  },

  // 🔹 Verify plain password against hashed password
  async verifyPassword(user, plainPassword) {
    if (!user || !user.password_hash) throw new Error("Invalid user or password hash");
    return await bcrypt.compare(plainPassword, user.password_hash);
  },
};
