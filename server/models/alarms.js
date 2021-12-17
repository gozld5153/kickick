"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class alarms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      alarms.belongsTo(models.users, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  alarms.init(
    {
      user_id: DataTypes.INTEGER,
      type: DataTypes.STRING,
      reference: DataTypes.STRING,
      content: DataTypes.STRING,
      is_checked: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "alarms",
    }
  );
  return alarms;
};
