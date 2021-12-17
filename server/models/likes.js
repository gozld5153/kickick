"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      likes.belongsTo(models.users, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      likes.belongsTo(models.posts, {
        foreignKey: "post_id",
        onDelete: "CASCADE",
      });
    }
  }
  likes.init(
    {
      user_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
      agreement: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "likes",
    }
  );
  return likes;
};
