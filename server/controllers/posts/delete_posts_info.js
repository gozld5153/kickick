const { users, posts } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 게시글 삭제 구현
  if (!req.params.post_id) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
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
  const post_id = req.params.post_id;

  try {
    // 토큰정보로 user_id 구함
    let user_info = await users.findOne({
      where: {
        username: username,
      },
    });
    user_info = user_info.get({ plain: true });
    const user_id = user_info.id;
    // post_id로 게시글에 저장된 user_id 구함
    let post_info = await posts.findOne({
      where: {
        id: post_id,
      },
    });
    post_info.get({ plain: true });
    // user_id 가 일치하지 않으면 권한x // 관리자는 가능
    if (post_info.user_id !== user_id && type !== "admin") {
      return res
        .status(401)
        .json({ data: err, message: "게시글을 삭제할 권한이 없습니다." });
    }
    // 게시글 삭제
    await posts.destroy({
      where: {
        id: post_id,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(201).json({ data: null, message: "ok" });
};
