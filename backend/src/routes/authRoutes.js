// routes/authRoutes.js
import express from "express";
import { body, validationResult } from "express-validator";
import { AuthController } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Async wrapper to automatically pass errors to errorMiddleware
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// ============================
// REGISTER
// ============================
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  asyncHandler(async (req, res, next) => {
     console.log("Request body:", req.body);
    const errors = validationResult(req);
    console.log(errors.array());

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    await AuthController.register(req, res, next);
  })
);

// ============================
// LOGIN
// ============================
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    await AuthController.login(req, res, next);
  })
);

// ============================
// LOGOUT
// ============================
// Protected route: only logged-in users can logout
router.post("/logout", authMiddleware, asyncHandler(AuthController.logout));

// ============================
// GET CURRENT USER
// ============================
// Protected route: returns user info from cookie token
router.get("/me", authMiddleware, asyncHandler(AuthController.me));

export default router;
