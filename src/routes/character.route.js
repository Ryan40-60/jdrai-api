import express from "express";

import validate from "../middlewares/validate.middleware.js";
import auth from "../middlewares/auth.middleware.js";

import characterValidation from "../validations/character.validation.js";
import {
  createCharacter,
  listCharacters,
  getCharacter,
  updateCharacter,
  deleteCharacter,
} from "../controllers/character.controller.js";

const router = express.Router();

// List characters route
router.get("/", auth(), listCharacters);

// Get character route
router.get(
  "/:id",
  auth(),
  validate(characterValidation.getCharacter),
  getCharacter
);

// Create character route
router.post(
  "/",
  auth(),
  validate(characterValidation.createCharacter),
  createCharacter
);

// Update character route
router.patch(
  "/:id",
  auth(),
  validate(characterValidation.updateCharacter),
  updateCharacter
);

// Update character route
router.delete(
  "/:id",
  auth(),
  validate(characterValidation.deleteCharacter),
  deleteCharacter
);

export default router;
