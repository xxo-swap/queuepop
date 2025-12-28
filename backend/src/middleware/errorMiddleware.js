// middleware/errorMiddleware.js

// ============================
// GLOBAL ERROR HANDLER
// ============================
// Catches all errors from routes, controllers, services
export const errorMiddleware = (err, req, res, next) => {
  // ============================
  // 1️⃣ Default values
  // ============================
  const statusCode = err.statusCode || 500;
  const message =
    err.message || "Something went wrong. Please try again.";

  // ============================
  // 2️⃣ Log error (server-side)
  // ============================
  console.error("🔥 Error:", {
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });

  // ============================
  // 3️⃣ Send safe response
  // ============================
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && {
      stack: err.stack,
    }),
  });
};
