import express from "express";

import envConfig from "../config/env.config.js";

// Import authentication routes
import authRoutes from "./auth.route.js";
// Import users routes
import userRoutes from "./user.route.js";
// Import characters routes
import characterRoutes from "./character.route.js";
// Import documentation routes
import docsRoutes from "./docs.route.js";

const router = express.Router();

// Use authentication routes
router.use("/auth", authRoutes);
// Use authentication routes
router.use("/user", userRoutes);
// Use authentication routes
router.use("/character", characterRoutes);

// If the environment is not in production, use documentation routes
if (envConfig.env !== "production") {
  router.use("/docs", docsRoutes);
}

export default router;
