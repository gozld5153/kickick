"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("users", [
      {
        type: "admin",
        username: "demouser2",
        email: "demouser@kickick.net",
        password:
          "$2b$10$B8IH2dfUY41gRNYwfgy4meX7zGjcpp7VXDfvxGOO0/snb7kAVxTX2",
        birthday: "",
        kick_money: "10000",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("users", null, {});
  },
};
