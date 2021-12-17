const { users, posts, favorites } = require("../../models");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");

module.exports = async (req, res) => {
  // TODO 즐겨찾기 삭제 구현
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
    // 토큰으로 user_id, post_id 로 즐겨찾기 정보 구함
    let user_info = await users.findOne({
      attributes: ["id"],
      where: {
        username: username,
      },
    });
    const user_id = user_info.get({ plain: true }).id;

    let favorite_info = await favorites.findOne({
      where: {
        user_id: user_id,
        post_id: post_id,
      },
      raw: true,
    });
    if (favorite_info) {
      // 즐겨찾기 삭제
      await favorites.destroy({
        where: {
          post_id: post_id,
          user_id: user_id,
        },
      });
      // posts 테이블에 favorite_count 1 감소
      await posts.update(
        {
          favorite_count: sequelize.literal(`favorite_count - 1`),
        },
        {
          where: {
            id: post_id,
          },
        }
      );
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(201).json({ data: null, message: "ok" });
};
