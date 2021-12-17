"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users_kicks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users_kicks.belongsTo(models.users, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      users_kicks.belongsTo(models.kicks, {
        foreignKey: "kick_id",
        onDelete: "CASCADE",
      });
    }
  }
  users_kicks.init(
    {
      user_id: DataTypes.INTEGER,
      kick_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "users_kicks",
    }
  );
  return users_kicks;
};
