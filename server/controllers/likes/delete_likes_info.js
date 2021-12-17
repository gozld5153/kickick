const { users, posts, likes } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 좋아요 삭제 구현
  if (!(req.params.post_id && req.cookies.token)) {
    return res.status(400).json({
      data: null,
      message: "post_id, 토큰 중 누락된 항목이 있습니다.",
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

  const { username } = decoded;
  const post_id = req.params.post_id;

  try {
    let user_info = await users.findOne({
      attributes: ["id"],
      where: {
        username: username,
      },
    });
    const user_id = user_info.get({ plain: true }).id;

    await likes.destroy({
      where: {
        user_id: user_id,
        post_id: post_id,
      },
    });

    // like_count 업데이트
    await posts.update(
      {
        like_count: sequelize.literal(`like_count - 1`),
      },
      {
        where: {
          id: post_id,
        },
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(201).json({ data: null, message: "ok" });
};
