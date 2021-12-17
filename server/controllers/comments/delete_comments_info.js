const { users, comments } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 댓글 삭제 구현
  if (!req.params.comment_id) {
    return res
      .status(400)
      .json({ data: null, message: "comment_id가 누락되었습니다." });
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
  const comment_id = req.params.comment_id;

  try {
    // 토큰 정보로 user_id 구함
    let user_info = await users.findOne({
      attributes: ["id"],
      where: {
        username: username,
      },
    });
    const user_id = user_info.get({ plain: true }).id;

    // comment_id 로 comment_info 구함
    let comment_info = await comments.findOne({
      attributes: ["user_id"],
      where: {
        id: comment_id,
      },
    });

    comment_info = comment_info.get({ plain: true });

    // 댓글 작성자가 맞는지 확인 // 관리자는 가능
    if (user_id !== comment_info.user_id && type !== "admin") {
      return res.status(401).json({ data: null, message: "권한이 없습니다." });
    }

    // 댓글 작성자가 맞으면 삭제
    await comments.destroy({
      where: {
        id: comment_id,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(201).json({ data: null, message: "ok" });
};
