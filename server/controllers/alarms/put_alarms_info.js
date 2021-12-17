const { users, alarms } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 알림 수정 구현
  if (!(req.params.alarm_id && req.cookies.token && req.body.is_checked)) {
    return res.status(400).json({
      data: null,
      message: "alarm_id, is_checked 중 누락된 항목이 있습니다.",
    });
  }

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
  const alarm_id = req.params.alarm_id;

  try {
    // 토큰으로 user_id 구함
    let user_info = await users.findOne({
      attributes: ["id"],
      where: {
        username: username,
      },
    });
    const user_id = user_info.get({ plain: true }).id;

    // alarm_id로 alarms 검색 후 user_id 가 일치하는 지 확인
    let alarm_info = await alarms.findOne({
      attributes: ["user_id"],
      where: {
        id: alarm_id,
      },
    });
    if (!alarm_info) {
      return res
        .status(400)
        .json({ data: err, message: "일치하는 알림 정보가 없습니다." });
    }
    alarm_info = alarm_info.get({ plain: true });

    if (user_id !== alarm_info.user_id) {
      return res.status(401).json({ data: err, message: "권한이 없습니다." });
    }

    // alarms 테이블 업데이트
    await alarms.update(
      {
        is_checked: req.body.is_checked,
      },
      {
        where: {
          id: alarm_id,
        },
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(201).json({ data: null, message: "ok" });
};
