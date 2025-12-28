// services/authService.js
import jwt from "jsonwebtoken";
import { AuthOrchestrator } from "../orchestrators/authOrchestrator.js";
import { StoreRepository } from "../repositories/storeRepository.js";
import { UserRepository } from "../repositories/userRepository.js";


export const AuthService = {
  // Async register delegating to orchestrator
  register: async (userData) => {
    return await AuthOrchestrator.register(userData);
  },

  async login(email, password) {
    const user = await UserRepository.getUserByEmail(email);
    if (!user) throw new Error("Invalid email or password");

    const isValid = await AuthOrchestrator.verifyPassword(user, password);
    if (!isValid) throw new Error("Invalid email or password");

    const store = await StoreRepository.getStoreById(user.store_id);

    return { user, store };
  },

  generateToken(user) {
    return jwt.sign(
      {
        userId: user.id,
        accountId: user.chain_id,
        storeId: user.store_id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
  },
};
