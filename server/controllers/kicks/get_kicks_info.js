const { users, kicks, users_kicks } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 킥 정보(단독) 구현
  if (!req.query.kick_id) {
    return res
      .status(400)
      .json({ data: null, message: "kick_id가 누락되었습니다." });
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
  const kick_id = req.query.kick_id;
  let data;

  try {
    // 토큰 정보로 user_id 받아옴
    let user_info = await users.findOne({
      attributes: ["id"],
      where: {
        username: username,
      },
    });
    user_info = user_info.get({ plain: true });
    const user_id = user_info.id;
    // user_id 로 users_kicks 테이블에서 검색
    let users_kicks_info = await users_kicks.findOne({
      where: {
        user_id: user_id,
        kick_id: kick_id,
      },
    });
    // kick을 구매하지 않았으면 권한 x
    if (!users_kicks_info) {
      return res.status(401).json({ data: err, message: "권한이 없습니다." });
    }
    data = await kicks.findOne({
      attributes: [
        ["id", "kick_id"],
        "post_id",
        "thumbnail",
        "content",
        "created_at",
        "updated_at",
      ],
      where: {
        id: kick_id,
      },
    });
    data = data.get({ plain: true });

    // id 명시적으로
    // if (data) {
    //   data.kick_id = data.id;
    //   delete data.id;
    // }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(200).json({ data: data, message: "ok" });
};
