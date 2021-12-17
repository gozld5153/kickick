"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class notices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      notices.belongsTo(models.users, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }
  notices.init(
    {
      user_id: DataTypes.INTEGER,
      type: DataTypes.STRING,
      notice_name: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      summary: DataTypes.STRING,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "notices",
    }
  );
  return notices;
};
