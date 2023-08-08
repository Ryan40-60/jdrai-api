/**
 * @description Mock data for the 'Character' table.
 * @type {SeedData[]} characterSeedData - Array containing character seed data.
 */
module.exports = {
  up: async () => {
    // Dynamic import the required modules
    const dbServiceModule = await import("../../services/db.service.js");
    const dbService = dbServiceModule.default;
    const CharacterModule = await import("../models/character.model.js");
    const Character = CharacterModule.default;
    const { characterSeedData } = await import("./data/character.mock.js");

    // Seed data into the 'Character' table
    await dbService.createMany(Character, characterSeedData, {
      ignoreDuplicates: true,
    });
  },
  down: async () => {
    // Dynamic import the required modules
    const dbServiceModule = await import("../../services/db.service.js");
    const dbService = dbServiceModule.default;
    const CharacterModule = await import("../models/character.model.js");
    const Character = CharacterModule.default;
    const { characterSeedData } = await import("./data/character.seed.js");

    // Prepare character IDs to delete
    const characterIdToDelete = characterSeedData.map((e) => e.id);

    // Delete data from the 'Character' table based on character IDs
    await dbService.destroy(Character, { id: characterIdToDelete });
  },
};
