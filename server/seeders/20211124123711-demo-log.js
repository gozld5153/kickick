"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("logs", [
      {
        user_id: 1,
        type: "signin",
        content: "demouser님이 로그인 하였습니다.",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("logs", null, {});
  },
};
