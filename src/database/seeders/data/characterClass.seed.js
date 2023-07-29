import { characterClasses } from "../../../config/enum.config.js";

export const characterClassSeedData = [
  {
    id: 1,
    class: characterClasses.WARRIOR,
    strength: 40,
    agility: 25,
    charisma: 15,
    luck: 20,
  },
  {
    id: 2,
    class: characterClasses.THIEF,
    strength: 15,
    agility: 40,
    charisma: 20,
    luck: 25,
  },
  {
    id: 3,
    class: characterClasses.MAGE,
    strength: 15,
    agility: 20,
    charisma: 30,
    luck: 35,
  },
  {
    id: 4,
    class: characterClasses.ARCHER,
    strength: 20,
    agility: 35,
    charisma: 25,
    luck: 20,
  },
];
