const { users, posts, favorites } = require("../../models");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");

module.exports = async (req, res) => {
  // TODO 즐겨찾기 생성 구현
  if (!req.body.post_id) {
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
  const post_id = Number(req.body.post_id);
  let data;

  try {
    // 토큰으로 유저정보 가져옴
    let user_info = await users.findOne({
      attributes: ["id"],
      where: {
        username: username,
      },
    });
    const user_id = user_info.get({ plain: true }).id;
    data = await favorites.findOrCreate({
      where: {
        user_id: user_id,
        post_id: post_id,
      },
      defaults: {
        user_id: user_id,
        post_id: post_id,
      },
    });
    if (data[1]) {
      // post 테이블에 favorite_count 증가
      await posts.update(
        {
          favorite_count: sequelize.literal(`favorite_count + 1`),
        },
        {
          where: {
            id: post_id,
          },
        }
      );
    }

    if (Array.isArray(data)) data = data[0];
    data = data.get({ plain: true });
    delete data.postId;
    delete data.userId;
    // id 명시적으로
    data.favorite_id = data.id;
    delete data.id;
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(200).json({ data: data, message: "ok" });
};
