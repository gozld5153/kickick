const { users, logs, alarms } = require("../../models");
const sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  // TODO 로그인 로직 구현
  // req.body.username / req.body.password 로 db 검색 후 일치하는 값 있으면 jwt 토큰 생성해서 쿠키에 넣어주고 로그인
  if (req.body.type === "guest") {
    try {
      // username 으로 유저 정보 검색
      data = await users.findOne({
        attributes: ["type", "username", "kick_money"],
        where: {
          username: req.body.username,
        },
      });
      data = data.get({ plain: true });
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ data: err, message: "일치하는 닉네임이 없습니다." });
    }

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
    delete data.id;

    return res
      .status(200)
      .cookie(
        "token",
        { access_token },
        {
          httpOnly: true,
        }
      )
      .json({ data: data, message: "ok" });
  }
  if (req.body.username && req.body.password) {
    let data;
    const username = req.body.username;
    try {
      // username 과 password 로 유저 정보 검색
      data = await users.findOne({
        attributes: [
          ["id", "user_id"],
          "type",
          "username",
          "email",
          "password",
          "profile",
          "birthday",
          "kick_money",
        ],
        where: {
          username: username,
        },
      });
      if (!data) {
        return res
          .status(401)
          .json({ data: null, message: "일치하는 닉네임이 없습니다." });
      }
      data = data.get({ plain: true });
      const user_id = data.user_id;

      // 비밀번호 확인 과정
      const match = await bcrypt.compare(req.body.password, data.password);
      delete data.password;

      if (!match) {
        return res
          .status(401)
          .json({ data: null, message: "비밀번호가 일치하지 않습니다." });
      }

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
          content: `로그인_${change} 킥머니를 받았습니다.`,
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
    } catch (err) {
      console.log(err);
      return res.status(401).json({ data: err, message: "데이터베이스 에러" });
    }

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
      .json({ data: data, message: "ok" });
  }

  // req.cookies.token 확인하고 로그인
  if (req.cookies.token) {
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
        raw: true,
      });
      const user_id = data.user_id;
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
          content: `로그인_${change} 킥머니를 받았습니다.`,
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
    } catch (err) {
      console.log(err);
      return res.status(500).json({ data: err, message: "데이터베이스 에러" });
    }
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
      .json({ data: data, message: "ok" });
  }
  return res
    .status(400)
    .json({ data: null, message: "로그인에 필요한 정보가 누락되었습니다." });
};
