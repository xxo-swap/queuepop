import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository.js";

export const AuthService = {
  register: async (name, email, password, role, accountId, storeId) => {
    // Check if user exists
    const existing = await UserRepository.getUserByEmail(email);
    if (existing) throw new Error("User already exists");

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await UserRepository.createUser({
      name,
      email,
      passwordHash,
      role,
      accountId,
      storeId,
    });

    return newUser;
  },

  login: async (email, password) => {
    const user = await UserRepository.getUserByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return { user, token };
  },
};
