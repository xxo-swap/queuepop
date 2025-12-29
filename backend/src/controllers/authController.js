// controllers/authController.js
import { AuthService } from "../services/authService.js";

export const AuthController = {
  // ============================
  // REGISTER
  // ============================
  // Creates account + store + admin user
  register: async (req, res, next) => {
    try {
      // Extract fields from request body
      const { name, email, password, storeName, contact, businessType, address } = req.body;

      // Basic validation
      if (!email || !password || !storeName) {
        return res.status(400).json({
          success: false,
          message: "Required fields missing",
        });
      }

      // Delegate full business logic to service
      // Service handles:
      // - account creation
      // - store creation
      // - admin user creation
      const result = await AuthService.register({ name, email, password, storeName, contact, businessType, address });

      // Generate JWT token from service
      const token = AuthService.generateToken(result.user);

      // Set secure HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      // Send response
      res.status(201).json({
        success: true,
        message: "Registered successfully",
        data: {
          user: result.user,
          account: result.account,
          store: result.store,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  // ============================
  // LOGIN
  // ============================
  // Authenticates user & sets cookie
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password required",
        });
      }

      // Service validates credentials
      const result = await AuthService.login(email, password);

      // Generate JWT token
      const token = AuthService.generateToken(result.user);
      console.log("JWT TOKEN:", token);
      // Set cookie
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({
        success: true,
        message: "Logged in successfully",
        data: {
          user: result.user,
          store: result.store,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  // ============================
  // LOGOUT
  // ============================
  logout: async (req, res, next) => {
    try {
      res.clearCookie("token");
      res.json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (err) {
      next(err);
    }
  },

  // ============================
  // ME
  // ============================
  // Returns authenticated user info
  me: async (req, res, next) => {
    try {
      res.json({
        success: true,
        data: { user: req.user },
      });
    } catch (err) {
      next(err);
    }
  },
};
