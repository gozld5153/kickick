const { users, posts, posts_tags } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 태그 삭제 구현
  if (!(req.params.tag_id && req.params.post_id)) {
    return res.status(400).json({
      data: null,
      message: "tag_id, post_id 중 누락된 항목이 있습니다.",
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
  const tag_id = req.params.tag_id;
  const post_id = req.params.post_id;

  try {
    // 토큰의 username 으로 user_id 가져옴
    let user_info = await users.findOne({
      attributes: ["id"],
      where: {
        username: username,
      },
    });
    const user_id = user_info.get({ plain: true }).id;

    // post_id로 검색한 게시글의 user_id 가져옴
    let post_info = await posts.findOne({
      attributes: ["user_id"],
      where: {
        id: post_id,
      },
    });
    post_info.get({ plain: true });

    // user_id 가 같은지 비교
    if (user_id !== post_info.user_id) {
      return res.status(401).json({ data: err, message: "권한이 없습니다." });
    }

    // posts_tags 에서 일치하는 값 삭제
    await posts_tags.destroy({
      where: {
        post_id: post_id,
        tag_id: tag_id,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(201).json({ data: null, message: "ok" });
};
