"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.posts);
      users.hasMany(models.comments);
      users.hasMany(models.likes);
      users.hasMany(models.favorites);
      users.hasMany(models.users_kicks);
      users.hasMany(models.alarms);
      users.hasMany(models.logs);
      users.hasMany(models.notices);
    }
  }
  users.init(
    {
      type: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      profile: DataTypes.STRING,
      birthday: DataTypes.STRING,
      kick_money: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
