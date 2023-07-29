import express from "express";

import validate from "../middlewares/validate.middleware.js";
import auth from "../middlewares/auth.middleware.js";

import userValidation from "../validations/user.validation.js";
import {
  getAuthenticatedUser,
  listUsers,
  getUser,
  updateAuthenticatedUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// Get authenticated user route
router.get("/me", auth(), getAuthenticatedUser);

// List users route
// Requires admin role to access (auth middleware with `admin` flag set to true).
router.get("/", auth(true), listUsers);

// Get user route
// Requires admin role to access (auth middleware with `admin` flag set to true).
router.get("/:id", auth(true), validate(userValidation.getUser), getUser);

// Update authenticated user route
router.patch(
  "/me",
  auth(),
  validate(userValidation.updateAuthenticatedUser),
  updateAuthenticatedUser
);

// Update user route
// Requires admin role to access (auth middleware with `admin` flag set to true).
router.patch(
  "/:id",
  auth(true),
  validate(userValidation.updateUser),
  updateUser
);

export default router;
