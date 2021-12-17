const { users, alarms } = require("../../models");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = async (req, res) => {
  // TODO 알림 정보 조회 구현

  if (!req.cookies.token) {
    return res
      .status(400)
      .json({ data: null, message: "토큰이 존재하지 않습니다." });
  }

  // page_num과 limit 기본값 설정
  const page_num = Number(req.query.page_num) || 1;
  const limit = Number(req.query.limit) || 10;

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
  let count;

  try {
    // 그냥 공지까지 포함헤서 count 보내주세요
    // 토큰으로 user_id 구함
    let user_info = await users.findOne({
      attributes: [["id", "user_id"]],
      where: {
        username: username,
      },
      raw: true,
    });

    const user_id = user_info.user_id;

    data = await alarms.findAndCountAll({
      attributes: [
        ["id", "alarm_id"],
        "type",
        "reference",
        "content",
        "is_checked",
        "created_at",
      ],
      where: {
        [Op.or]: [
          {
            user_id: user_id,
          },
          {
            user_id: null,
          },
        ],
        is_checked: false,
      },
      order: [["id", "DESC"]],
      offset: limit * (page_num - 1),
      limit: limit,
    });

    // count 와 실제 데이터 배열 재할당
    count = data.count;
    data = data.rows;

    // reference 필드 파싱
    data = data.map((el) => {
      el = el.get({ plain: true });
      el.reference = JSON.parse(el.reference);
      return el;
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(200).json({ count: count, data: data, message: "ok" });
};
