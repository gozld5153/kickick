"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id",
        },
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      post_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT,
      },
      cost: {
        type: Sequelize.INTEGER,
        defaultValue: 100,
      },
      view_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      favorite_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      like_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("posts");
  },
};
