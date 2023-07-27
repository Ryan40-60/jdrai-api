import express from "express";

import validate from "../middlewares/validate.middleware.js";
import auth from "../middlewares/auth.middleware.js";

import userValidation from "../validations/user.validation.js";
import userController from "../controllers/user.controller.js";

const router = express.Router();

// List users route
router.get("/", auth(true), userController.listUsers);

// Get authenticated user route
router.get("/me", auth(), userController.getAuthenticatedUser);

// Get user route
router.get(
  "/:id",
  auth(true),
  validate(userValidation.getUser),
  userController.getUser
);

export default router;
