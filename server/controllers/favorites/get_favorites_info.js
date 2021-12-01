const { users, posts, favorites } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 즐겨찾기 조회 구현
  // user_id 존재할 때 관리자가 확인하는 api
  // if (req.query.user_id) {
  //   return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  // }

  if (!req.cookies.token) {
    return res
      .status(400)
      .json({ data: null, message: "토큰이 존재하지 않습니다." });
  }

  // page_num과 limit 기본값 설정
  const page_num = Number(req.query.page_num) || 1;
  const limit = Number(req.query.limit) || 10;

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
  let data;

  try {
    data = await users.findOne({
      attributes: ["id"],
      where: {
        username: username,
      },
      include: [
        {
          model: favorites,
          attributes: [["id", "favorite_id"]],
          offset: limit * (page_num - 1),
          limit: limit,
          include: [
            {
              model: posts,
              attributes: [
                ["id", "post_id"],
                // "user_id",
                "category",
                "post_name",
                "view_count",
              ],
              include: [
                {
                  model: users,
                  attributes: ["username", "profile"],
                },
              ],
            },
          ],
        },
      ],
    });
    data = data.get({ plain: true }).favorites;
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(200).json({ data: data, message: "ok" });
};
