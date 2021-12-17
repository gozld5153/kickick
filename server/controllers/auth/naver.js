const axios = require("axios");
const { users, logs, alarms } = require("../../models");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");

module.exports = async (req, res) => {
  // TODO 네이버 소셜로그인 구현
  const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URI = process.env.NAVER_REDIRECT_URI;
  const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

  if (!(req.body.code && req.body.state)) {
    return res.status(400).json({
      data: null,
      message: "code, state 중 누락된 항목이 있습니다.",
    });
  }

  const api_url =
    "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" +
    NAVER_CLIENT_ID +
    "&client_secret=" +
    NAVER_CLIENT_SECRET +
    "&redirect_uri=" +
    NAVER_REDIRECT_URI +
    "&code=" +
    req.body.code +
    "&state=" +
    req.body.state;
  let data;
  let access_token;
  try {
    data = await axios.get(api_url, {
      headers: {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
      },
    });
    access_token = data.data.access_token;

    user_info = await axios.get("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    // user_info에 정보 들어옴
    const nickname = user_info.data.response.nickname;
    const email = user_info.data.response.email;
    data = await users.findOrCreate({
      attributes: [
        "id",
        "type",
        "username",
        "email",
        "profile",
        "birthday",
        "kick_money",
      ],
      where: {
        email: email,
      },
      defaults: {
        type: "naver",
        username: `naver ${nickname}`,
        email: email,
        kick_money: 1500,
      },
    });

    let is_created = data[1];
    data = data[0].get({ plain: true });

    // 생성일 때 회원가입 로그 추가
    if (is_created) {
      await logs.create({
        user_id: data.id,
        type: "email auth",
        content: "이메일 인증",
      });

      // 킥머니 지급 로그 추가
      await logs.create({
        user_id: data.id,
        type: "kick_money",
        content: `이메일_1500 킥머니를 받았습니다.`,
      });
      // 킥머니 지급 알림 추가
      await alarms.create({
        user_id: data.id,
        type: "alarms",
        content: `이메일 인증으로 1500 킥머니를 받았습니다.`,
      });
    }

    const user_id = data.id;
    const username = data.username;

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
    return res.status(500).json({
      data: err,
      message: "데이터베이스 에러",
    });
  }
  // 토큰 발급
  access_token = jwt.sign(
    {
      type: data.type,
      username: data.username,
    },
    process.env.ACCESS_SECRET,
    {
      expiresIn: "3d",
    }
  );

  return res
    .status(201)
    .cookie(
      "token",
      { access_token },
      {
        httpOnly: true,
      }
    )
    .json({ data: data, message: "ok" });
};
