/**
 * @description Seed data for the 'CharacterClass' table.
 * @type {SeedData[]} characterClassSeedData - Array containing character class seed data.
 */
module.exports = {
  up: async () => {
    // Dynamic import the required modules
    const dbServiceModule = await import("../../services/db.service.js");
    const dbService = dbServiceModule.default;
    const characterClassModule = await import(
      "../models/characterClass.model.js"
    );
    const CharacterClass = characterClassModule.default;
    const { characterClassSeedData } = await import(
      "./data/characterClass.seed.js"
    );

    // Seed data into the 'CharacterClass' table
    await dbService.createMany(CharacterClass, characterClassSeedData, {
      ignoreDuplicates: true,
    });
  },
  down: async () => {
    // Dynamic import the required modules
    const dbServiceModule = await import("../../services/db.service.js");
    const dbService = dbServiceModule.default;
    const characterClassModule = await import(
      "../models/characterClass.model.js"
    );
    const CharacterClass = characterClassModule.default;
    const { characterClassSeedData } = await import(
      "./data/characterClass.seed.js"
    );

    // Prepare character class IDs to delete
    const characterClassIdToDelete = characterClassSeedData.map((e) => e.id);

    // Delete data from the 'CharacterClass' table based on character IDs
    await dbService.destroy(CharacterClass, { id: characterClassIdToDelete });
  },
};
