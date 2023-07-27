/**
 * @description Seed data for the 'User' table.
 * @type {SeedData[]} userSeedData - Array containing user seed data.
 */
module.exports = {
  up: async () => {
    // Dynamic import the required modules
    const dbServiceModule = await import("../../services/db.service.js");
    const dbService = dbServiceModule.default;
    const UserModule = await import("../models/user.model.js");
    const User = UserModule.default;
    const { userSeedData } = await import("./data/user.seed.js");

    // Seed data into the 'User' table
    await dbService.createMany(User, userSeedData, {
      ignoreDuplicates: true,
    });
  },
  down: async () => {
    // Dynamic import the required modules
    const dbServiceModule = await import("../../services/db.service.js");
    const dbService = dbServiceModule.default;
    const UserModule = await import("../models/user.model.js");
    const User = UserModule.default;
    const { userSeedData } = await import("./data/user.seed.js");

    // Prepare user IDs to delete
    const userIdToDelete = userSeedData.map((e) => e.id);

    // Delete data from the 'User' table based on user IDs
    await dbService.destroy(User, { id: userIdToDelete });
  },
};
