const { users } = require("../../models");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = async (req, res) => {
  // TODO 유저정보 조회
  // query 있으면 query로 검색 (email / username)
  // 없으면 token 내용으로

  // page_num과 limit 기본값 설정
  const page_num = req.query.page_num || 1;
  const limit = req.query.limit || 10;

  // email로 검색요청
  if (req.query.email) {
    let data;
    try {
      data = await users.findAll({
        attributes: [
          "type",
          "username",
          "email",
          "profile",
          "birthday",
          "kick_money",
        ],
        where: {
          email: {
            [Op.like]: `%${req.query.email}%`,
          },
        },
        offset: limit * (page_num - 1),
        limit: limit,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ data: err, message: "데이터베이스 에러" });
    }
    return res.status(200).json({ data: data, message: "ok" });
  }

  // username으로 검색요청
  if (req.query.username) {
    let data;
    try {
      data = await users.findAll({
        attributes: [
          "type",
          "username",
          "email",
          "profile",
          "birthday",
          "kick_money",
        ],
        where: {
          username: {
            [Op.like]: `%${req.query.username}%`,
          },
        },
        offset: limit * (page_num - 1),
        limit: limit,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ data: err, message: "데이터베이스 에러" });
    }
    return res.status(200).json({ data: data, message: "ok" });
  }

  // req.cookies.token 으로 유저 정보 조회
  if (!req.cookies.token) {
    return res
      .status(400)
      .json({ data: null, message: "토큰이 존재하지 않습니다." });
  }

  const token = req.cookies.token.access_token;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_SECRET);
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ data: err, message: "토큰이 만료되었습니다." });
  }
  const { username } = decoded;
  let data;
  try {
    data = await users.findOne({
      attributes: [
        "type",
        "username",
        "email",
        "profile",
        "birthday",
        "kick_money",
      ],
      where: {
        username: username,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(200).json({ data: data, message: "ok" });
};
