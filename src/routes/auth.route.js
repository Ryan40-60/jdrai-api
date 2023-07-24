import express from "express";

import validate from "../middlewares/validate.middleware.js";
import auth from "../middlewares/auth.middleware.js";

import authController from "../controllers/auth.controller.js";
import authValidation from "../validations/auth.validation.js";

const router = express.Router();

// Register route
router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);

// Login route
router.post("/login", validate(authValidation.login), authController.login);

// Logout route
router.post("/logout", auth(), authController.logout);

export default router;
