// src/server.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

/* ===========================
   ENV VALIDATION (FAIL FAST)
=========================== */
if (!process.env.JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is not defined");
}


if (!process.env.CLIENT_URL) {
  throw new Error("❌ CLIENT_URL is not defined");
}

/* ===========================
   APP SETUP
=========================== */
const app = express();

/**
 * IMPORTANT:
 * Needed when running behind proxies
 * (Vercel, Nginx, Load balancer)
 */
app.set("trust proxy", 1);

/* ===========================
   MIDDLEWARES
=========================== */
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })

  
);

/* ===========================
   ROUTES
=========================== */
import authRoutes from "./routes/authRoutes.js";
app.use("/api/v1/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("OK");
});

/* ===========================
   ERROR HANDLER (LAST)
=========================== */
import { errorMiddleware } from "./middleware/errorMiddleware.js";
app.use(errorMiddleware);

import { checkDbConnection } from "../db/checkDb.js";
await checkDbConnection();
/* ===========================
   SERVER
=========================== */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
