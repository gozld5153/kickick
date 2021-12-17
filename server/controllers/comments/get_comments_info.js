const { users, posts, comments } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 댓글 정보 구현

  // page_num과 limit 기본값 설정
  const page_num = Number(req.query.page_num) || 1;
  const limit = Number(req.query.limit) || 10;

  // post_id 가 있을 때 한 게시글의 댓글 정보
  if (req.query.post_id) {
    let data;
    let count;
    const post_id = req.query.post_id;

    try {
      data = await posts.findOne({
        attributes: ["id"],
        where: {
          id: post_id,
        },
        include: [
          {
            model: comments,
            attributes: [["id", "comment_id"], "content", "created_at"],
            include: [
              {
                model: users,
                attributes: ["username", "profile"],
              },
            ],
          },
        ],
      });
      const comment_info = await comments.findAndCountAll({
        attributes: [["id", "comment_id"], "content", "created_at"],
        offset: limit * (page_num - 1),
        limit: limit,
        distinct: true,
        order: [["id", "DESC"]],
        include: [
          {
            model: users,
            attributes: ["username", "profile"],
          },
          {
            model: posts,
            attributes: ["id"],
            where: {
              id: post_id,
            },
          },
        ],
      });
      data = comment_info.rows.map((el) => {
        el = el.get({ plain: true });
        delete el.post;
        return el;
      });
      count = comment_info.count;
    } catch (err) {
      console.log(err);
      return res.status(500).json({ data: err, message: "데이터베이스 에러" });
    }
    return res.status(200).json({ count: count, data: data, message: "ok" });
  }

  // post_id 가 없을 때 쿠키로 내 댓글정보만
  if (!req.cookies.token) {
    return res
      .status(400)
      .json({ data: null, message: "post_id와 토큰이 존재하지 않습니다." });
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

  let data;
  let count;
  const { username } = decoded;

  try {
    const comment_info = await comments.findAndCountAll({
      attributes: ["post_id", "content", "created_at"],
      offset: limit * (page_num - 1),
      limit: limit,
      distinct: true,
      order: [["id", "DESC"]],
      include: [
        {
          model: posts,
          attributes: ["post_name"],
        },
        {
          model: users,
          attributes: ["username", "profile"],
          where: {
            username: username,
          },
        },
      ],
    });
    data = comment_info.rows.map((el) => el.get({ plain: true }));
    count = comment_info.count;
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(200).json({ count: count, data: data, message: "ok" });
};
