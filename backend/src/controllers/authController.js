import { AuthService } from "../services/authService.js";

export const AuthController = {
  register: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const user = await AuthService.register(name, email, password);
      res.status(201).json({ success: true, user });
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const data = await AuthService.login(email, password);
      res.json({ success: true, ...data });
    } catch (err) {
      next(err);
    }
  },
};
