import express from "express";

import validate from "../middlewares/validate.middleware.js";
import auth from "../middlewares/auth.middleware.js";

import authValidation from "../validations/auth.validation.js";
import { login, register, logout } from "../controllers/auth.controller.js";

const router = express.Router();

// Register route
router.post("/register", validate(authValidation.register), register);

// Login route
router.post("/login", validate(authValidation.login), login);

// Logout route
router.post("/logout", auth(), logout);

export default router;
