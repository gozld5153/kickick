"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class kicks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      kicks.belongsTo(models.posts, {
        foreignKey: "post_id",
        onDelete: "CASCADE",
      });
      kicks.hasMany(models.users_kicks);
    }
  }
  kicks.init(
    {
      post_id: DataTypes.INTEGER,
      thumbnail: DataTypes.STRING,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "kicks",
    }
  );
  return kicks;
};
