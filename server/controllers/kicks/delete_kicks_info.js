const { users, posts, kicks } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 킥 삭제 구현
  if (!req.params.kick_id) {
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
  const kick_id = req.params.kick_id;

  try {
    // 토큰에서 받아온 username 으로 user_id 구함
    let user_info = await users.findOne({
      attributes: ["id"],
      where: {
        username: username,
      },
    });
    user_info = user_info.get({ plain: true });
    const user_id = user_info.id;
    // kick_id로 kick_info 구함
    let kick_info = await kicks.findOne({
      attributes: ["id", "post_id"],
      where: {
        id: kick_id,
      },
      include: [
        {
          model: posts,
          attributes: ["user_id"],
        },
      ],
    });
    kick_info = kick_info.get({ plain: true });
    // user_id 와 킥과 연결된 게시글 user_id 가 다르면 권한 x
    if (user_id !== kick_info.post.user_id) {
      return res.status(401).json({ data: null, message: "권한이 없습니다." });
    }
    // kick 삭제
    await kicks.destroy({
      where: {
        id: kick_id,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(201).json({ data: null, message: "ok" });
};
