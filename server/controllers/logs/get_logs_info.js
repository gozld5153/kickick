const { users, logs } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 로그 정보 조회
  // query user_id와 username 으로 검색하는건 관리자만 차후 구현

  // 토큰으로 내 로그 정보 조회
  console.log(req.query);

  // page_num과 limit 기본값 설정
  const page_num = Number(req.query.page_num) || 1;
  const limit = Number(req.query.limit) || 10;

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
  const type = req.query.type;
  const { username } = decoded;
  let data;
  let count;

  try {
    let where_obj = {};
    if (type) {
      where_obj = { type };
    }
    // 토큰으로 log정보 구함
    let user_info = await users.findOne({
      attributes: [["id", "user_id"]],
      where: {
        username: username,
      },
      raw: true,
    });
    const user_id = user_info.user_id;

    // where_obj 에 user_id 추가
    where_obj.user_id = user_id;

    let log_info = await logs.findAndCountAll({
      model: logs,
      attributes: [["id", "log_id"], "type", "content", "created_at"],
      where: where_obj,
      order: [["id", "DESC"]],
      offset: limit * (page_num - 1),
      limit: limit,
    });
    count = log_info.count;
    data = log_info.rows;

    data = data.map((el) => el.get({ plain: true }));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(200).json({ count: count, data: data, message: "ok" });
};
