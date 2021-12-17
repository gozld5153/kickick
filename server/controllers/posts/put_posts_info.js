const { users, posts } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 게시글 수정 구현
  if (!req.params.post_id) {
    return res
      .status(400)
      .json({ data: null, message: "post_id가 누락되었습니다." });
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
  const post_id = req.params.post_id;

  try {
    // 토큰 내용으로 유저 id 꺼내옴
    let user_info = await users.findOne({
      attributes: ["id"],
      where: {
        username: username,
      },
    });
    user_info = user_info.get({ plain: true });
    const user_id = user_info.id;
    // post_id 로 게시글 정보 가져옴
    let post_info = await posts.findOne({
      where: {
        id: post_id,
      },
    });
    // user_id가 일치하는지 확인하고 일치하지 않으면 권한 x
    post_info = post_info.get({ plain: true });
    if (post_info.user_id !== user_id) {
      return res
        .status(401)
        .json({ data: null, message: "게시글을 수정할 권한이 없습니다." });
    }
    // 게시글 수정
    await posts.update(req.body, {
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
