import express from "express";

import validate from "../middlewares/validate.middleware.js";

import authController from "../controllers/auth.controller.js";
import authValidation from "../validations/auth.validation.js";

const router = express.Router();

// Register route
router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);

export default router;
