const axios = require("axios");
const { users, logs, alarms } = require("../../models");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");

module.exports = async (req, res) => {
  // TODO kakao 소셜로그인 구현
  // req.body.code 에 담겨서 옴
  // 환경변수 받아옴
  const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

  if (!req.body.code) {
    return res
      .status(400)
      .json({ data: null, message: "code가 누락되었습니다." });
  }
  // url 설정
  const url = new URL("https://kauth.kakao.com/oauth/token");
  url.searchParams.append("grant_type", "authorization_code");
  url.searchParams.append("client_id", KAKAO_CLIENT_ID);
  url.searchParams.append("redirect_uri", KAKAO_REDIRECT_URI);
  url.searchParams.append("code", req.body.code);

  let access_token;
  let data;
  try {
    // 코드로 토큰 요청
    const token_info = await axios.post(url.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    access_token = token_info.data.access_token;
    // 토큰으로 유저정보 요청
    let user_info = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    user_info = user_info.data.kakao_account;
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
        email: user_info.email,
      },
      defaults: {
        type: "kakao",
        email: user_info.email,
        username: `kakao ${user_info.profile.nickname}`,
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
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
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
