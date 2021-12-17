"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comments.belongsTo(models.users, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      comments.belongsTo(models.posts, {
        foreignKey: "post_id",
        onDelete: "CASCADE",
      });
    }
  }
  comments.init(
    {
      user_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "comments",
    }
  );
  return comments;
};
