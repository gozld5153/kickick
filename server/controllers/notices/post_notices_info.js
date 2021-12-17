const { users, notices, alarms } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 공지 생성 구현
  if (
    !(
      req.body.type &&
      req.body.notice_name &&
      req.body.summary &&
      req.body.content
    )
  ) {
    return res.status(400).json({
      data: null,
      message: "type, notice_name, summary, content 중 누락된 항목이 있습니다.",
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

  const { username, type } = decoded;
  let data;
  // 관리자가 아니면 권한 x
  if (type !== "admin") {
    return res.status(401).json({ data: null, message: "권한이 없습니다." });
  }
  try {
    let user_info = await users.findOne({
      where: {
        username: username,
      },
    });
    user_info = user_info.get({ plain: true });
    user_id = user_info.id;
    data = await notices.create({
      user_id,
      ...req.body,
    });
    data = data.get({ plain: true });
    delete data.userId;

    // id 명시적으로
    data.notice_id = data.id;
    delete data.id;

    // alarms 테이블에 추가
    await alarms.create({
      type: req.body.type,
      reference: JSON.stringify({ table: "notices", id: data.notice_id }),
      content: req.body.notice_name,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(201).json({ data: data, message: "ok" });
};
