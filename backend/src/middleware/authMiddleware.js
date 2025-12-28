// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

// ============================
// AUTH MIDDLEWARE
// ============================
// Protects routes by verifying JWT from cookies
export const authMiddleware = (req, res, next) => {
  try {
    // ============================
    // 1️⃣ Read token from cookies
    // ============================
    // Cookie is automatically sent by browser
    const token = req.cookies?.token;

    // If no token → user is not authenticated
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // ============================
    // 2️⃣ Verify JWT token
    // ============================
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ============================
    // 3️⃣ Attach user to request
    // ============================
    // This makes user available in controllers
    req.user = decoded;

    // ============================
    // 4️⃣ Allow request to continue
    // ============================
    next();
  } catch (err) {
    // ============================
    // Token invalid / expired
    // ============================
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
