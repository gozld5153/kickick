"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class posts_tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      posts_tags.belongsTo(models.posts, {
        foreignKey: "post_id",
        onDelete: "CASCADE",
      });
      posts_tags.belongsTo(models.tags, {
        foreignKey: "tag_id",
        onDelete: "CASCADE",
      });
    }
  }
  posts_tags.init(
    {
      post_id: DataTypes.INTEGER,
      tag_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "posts_tags",
    }
  );
  return posts_tags;
};
