import express from "express";
import cors from "cors";
import "dotenv/config";

import { clerkMiddleware } from "@clerk/express";

import aiRouter from "./routes/aiRoutes.js";
import userRouter from "./routes/userRoutes.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express();

/* ---------------- CONNECT SERVICES ---------------- */
await connectCloudinary();

/* ---------------- GLOBAL MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());   // Only this stays global

/* ---------------- HEALTH CHECK ---------------- */
app.get("/", (req, res) => res.send("Server is Live!"));

/* ---------------- ROUTES ---------------- */
/* Auth is handled INSIDE routes */
app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
