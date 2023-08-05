import express from "express";

import envConfig from "../config/env.config.js";

// Import authentication routes
import authRoutes from "./auth.route.js";
// Import user routes
import userRoutes from "./user.route.js";
// Import character routes
import characterRoutes from "./character.route.js";
// Import character class routes
import characterClassRoutes from "./characterClass.route.js";
// Import documentation routes
import docsRoutes from "./docs.route.js";

const router = express.Router();

// Use authentication routes
router.use("/auth", authRoutes);
// Use user routes
router.use("/user", userRoutes);
// Use character routes
router.use("/character", characterRoutes);
// Use character class routes
router.use("/class", characterClassRoutes);

// If the environment is not in production, use documentation routes
if (envConfig.env !== "production") {
  router.use("/docs", docsRoutes);
}

export default router;
