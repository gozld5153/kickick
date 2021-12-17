const {
  users,
  posts,
  kicks,
  comments,
  likes,
  favorites,
  users_kicks,
  posts_tags,
  tags,
  alarms,
  logs,
  notices,
} = require("./../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const escapeRegExp = require("lodash").escapeRegExp;
const fuzzy_searcher = require("../functions/fuzzy_searcher");
const typo_searcher = require("../functions/typo_searcher");

module.exports = (req, res) => {
  if (!req.body.test) {
    return res.status(500).json({ data: null, message: "test가 없습니다." });
  }
  let data;
  try {
    data = typo_searcher(req.body.test);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(200).json({ data: data, message: "ok" });
};
