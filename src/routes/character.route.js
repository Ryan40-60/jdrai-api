import express from "express";

import validate from "../middlewares/validate.middleware.js";
import auth from "../middlewares/auth.middleware.js";

import characterValidation from "../validations/character.validation.js";
import {
  createCharacter,
  listCharacters,
} from "../controllers/character.controller.js";

const router = express.Router();

// List characters route
router.get("/", auth(), listCharacters);

// Create character route
router.post(
  "/",
  auth(),
  validate(characterValidation.createCharacter),
  createCharacter
);

export default router;
