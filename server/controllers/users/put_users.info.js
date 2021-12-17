const { users, logs } = require("../../models");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const nodemailer = require("nodemailer");
const ejs = require("ejs");

module.exports = async (req, res) => {
  // TODO 유저 정보 수정 구현
  // 토큰이 없으면 실패
  // 토큰으로 type, username 뽑아냄
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
  // 토큰은 유효, 토큰으로 유저정보 수정
  const { username, type } = decoded;
  const change = Number(req.body.kick_money);
  console.log(decoded);

  try {
    // type이 "guest"면 인증메일 보내야 함
    if (type === "guest") {
      if (!(req.body.email && req.body.username && req.body.password)) {
        return res.status(400).json({
          data: null,
          message: "email, username, password 중 누락된 항목이 있습니다.",
        });
      }
    }

    // 유저 정보 업데이트 전에 킥머니 변경이 이루어지는지 확인
    if (req.body.kick_money) {
      // 킥머니 0미만이 되는지 확인부터
      let user_info = await users.findOne({
        attributes: [["id", "user_id"], "kick_money"],
        where: {
          username: username,
        },
      });
      user_info = user_info.get({ plain: true });
      const kick_money = user_info.kick_money;
      const user_id = user_info.user_id;

      if (kick_money + change < 0) {
        return res
          .status(400)
          .json({ data: null, message: "킥머니가 부족합니다." });
      }

      // 킥머니 변동 로그 남김
      let text;
      if (change > 0) {
        text = `${change} 킥머니를 받았습니다.`;
      } else {
        text = `${Math.abs(change)} 킥머니를 사용하였습니다.`;
      }

      await logs.create({
        user_id: user_id,
        type: "kick_money",
        content: text,
      });
    }

    // 유저정보 수정
    let update_obj = { ...req.body };
    // kick_money 변경이 있다면
    if (change) {
      update_obj.kick_money = sequelize.literal(`kick_money + ${change}`);
    }
    // 요청에 비밀번호가 포함되어있다면
    if (req.body.password) {
      // 비밀번호 해싱해서 수정
      bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ data: null, message: "데이터베이스 에러" });
        }
        console.log(hash);

        await users.update(
          {
            ...update_obj,
            password: hash,
          },
          {
            where: {
              username: username,
            },
          }
        );
      });
    } else {
      // 비밀번호가 없으면 바로 업데이트
      await users.update(
        {
          ...update_obj,
        },
        {
          where: {
            username: username,
          },
        }
      );
    }
    // 요청에 email이 포함되어있으면
    if (req.body.email) {
      // 이메일 보냄

      const CLIENT_URL = process.env.CLIENT_URL;
      const redirect = `${CLIENT_URL}/mailauth/${req.body.username}`;

      let email_template;
      ejs.renderFile(
        __dirname + "/email_template.ejs",
        { redirect },
        (err, data) => {
          if (err) {
            console.log(err);
          }
          email_template = data;
        }
      );

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });

      const mailOptions = {
        from: `"KICKICK 관리자" <${process.env.NODEMAILER_EMAIL}>`,
        to: req.body.email,
        subject: "KICKICK 회원가입 인증 메일입니다.",
        html: email_template,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      // update 시 type email auth required로 변경
      update_obj = {
        ...update_obj,
        type: "email auth required",
      };
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(201).json({ data: null, message: "ok" });
};
