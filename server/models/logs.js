"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      logs.belongsTo(models.users, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  logs.init(
    {
      user_id: DataTypes.INTEGER,
      type: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "logs",
    }
  );
  return logs;
};
