import express from "express";

import validate from "../middlewares/validate.middleware.js";

import characterClassValidation from "../validations/characterClass.validation.js";
import {
  listCharacterClasses,
  getCharacterClass,
} from "../controllers/characterClass.controller.js";

const router = express.Router();

// List character classes route
router.get("/", listCharacterClasses);

// Get character class route
router.get(
  "/:id",
  validate(characterClassValidation.getCharacterClass),
  getCharacterClass
);

export default router;
