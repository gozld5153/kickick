"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class favorites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      favorites.belongsTo(models.users, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      favorites.belongsTo(models.posts, {
        foreignKey: "post_id",
        onDelete: "CASCADE",
      });
    }
  }
  favorites.init(
    {
      user_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "favorites",
    }
  );
  return favorites;
};
