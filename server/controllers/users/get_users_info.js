const { users, logs } = require("../../models");
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

  // email 또는 username 으로 검색
  if (req.query.email || req.query.username) {
    // where_obj로 분기 구현
    let where_obj;
    if (req.query.email) {
      where_obj = {
        email: {
          [Op.like]: `%${req.query.email}%`,
        },
      };
    }
    if (req.query.username) {
      where_obj = {
        username: {
          [Op.like]: `%${req.query.username}%`,
        },
      };
    }

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
        where: where_obj,
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
  const { username, type } = decoded;
  let data;

  // type guest 일 때,
  if (type === "guest") {
    console.log("guest");
    try {
      data = await users.findOne({
        attributes: [["id", "user_id"], "type", "username", "kick_money"],
        where: {
          username: username,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ data: err, message: "데이터베이스 에러" });
    }
    return res.status(200).json({ data: data, message: "guest login" });
  }

  // 토큰으로 유저정보 조회 guest가 아닐 때
  try {
    data = await users.findOne({
      attributes: [
        ["id", "user_id"],
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
    if (!data) {
      return res.status(500).json({ data: null, message: "데이터베이스 에러" });
    }
    data = data.get({ plain: true });
    const user_id = data.user_id;

    // today_login false면 로그에 기록
    if (req.query.today_login === "false") {
      // 로그에 기록
      let log_info = await logs.findAll({
        where: {
          user_id: user_id,
          type: "signin",
        },
        order: [["id", "DESC"]],
        raw: true,
      });
      // 로그 살펴 봄
      let log_date;
      const today = new Date();
      if (log_info.length !== 0) {
        log_date = log_info[0].created_at;
      }
      // 오늘 로그인한 로그가 있는지 확인
      if (
        !log_date ||
        !(
          log_date.getDate() === today.getDate() &&
          log_date.getMonth() === today.getMonth() &&
          log_date.getFullYear() === today.getFullYear()
        )
      ) {
        // 로그인 로그 추가
        await logs.create({
          user_id: user_id,
          type: "signin",
          content: `${username}님이 로그인 하였습니다.`,
        });
        // 킥머니 지급
        let change = 100;
        // 3일간 로그인 기록이 있다면

        if (log_info.length >= 2) {
          log_date = log_info[1].created_at;
          const prev_3days = new Date(today - 3600000 * 24 * 3);
          if (
            log_date.getDate() === prev_3days.getDate &&
            log_date.getMonth() === today.getMonth() &&
            log_date.getFullYear() === today.getFullYear()
          ) {
            change = 200;
          }
        }

        await users.update(
          {
            kick_money: sequelize.literal(`kick_money + ${change}`),
          },
          {
            where: {
              username: username,
            },
          }
        );
        data.kick_money += change;
        // 킥머니 지급 로그 추가
        await logs.create({
          user_id: user_id,
          type: "kick_money",
          content: `${change} 킥머니를 받았습니다.`,
        });
        // 킥머니 지급 알림 추가
        await alarms.create({
          user_id: user_id,
          type: "alarms",
          content: `로그인으로 ${change} 킥머니를 받았습니다.`,
        });
        // 토큰 발급
        const access_token = jwt.sign(
          {
            type: data.type,
            username: data.username,
          },
          process.env.ACCESS_SECRET,
          {
            expiresIn: "3d",
          }
        );
        delete data.user_id;

        return res
          .status(200)
          .cookie(
            "token",
            { access_token },
            {
              httpOnly: true,
            }
          )
          .json({ data: data, message: "first login" });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(200).json({ data: data, message: "ok" });
};
