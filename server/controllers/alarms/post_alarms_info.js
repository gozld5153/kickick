const { alarms } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 알림 생성 구현
  if (!(req.body.user_id && req.cookies.token)) {
    return res.status(400).json({
      data: null,
      message: "user_id, 토큰 중 누락된 항목이 있습니다.",
    });
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

  const { type } = decoded;
  let data;

  if (type !== "admin") {
    return res.status(401).json({ data: err, message: "권한이 없습니다." });
  }

  try {
    data = await alarms.create({
      ...req.body,
      reference: JSON.stringify(req.body.reference),
    });
    data = data.get({ plain: true });
    delete data.userId;
    // id 명시적으로
    data.alarm_id = data.id;
    delete data.id;
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(201).json({ data: data, message: "ok" });
};
