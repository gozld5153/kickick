"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("posts", [
      {
        user_id: 1,
        category: "여가_킥",
        post_name: "테스트용 게시글",
        content: "테스트 게시글 내용",
        favorite_count: 1,
        like_count: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("posts", null, {});
  },
};
