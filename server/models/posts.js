"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      posts.belongsTo(models.users, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
      posts.hasOne(models.kicks);
      posts.hasMany(models.comments);
      posts.hasMany(models.likes);
      posts.hasMany(models.favorites);
      posts.hasMany(models.posts_tags);
    }
  }
  posts.init(
    {
      user_id: DataTypes.INTEGER,
      category: DataTypes.STRING,
      post_name: DataTypes.STRING,
      content: DataTypes.TEXT,
      cost: DataTypes.INTEGER,
      view_count: DataTypes.INTEGER,
      favorite_count: DataTypes.INTEGER,
      like_count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "posts",
    }
  );
  return posts;
};
