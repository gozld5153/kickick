const { users, posts } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 게시글 생성 구현
  // req.body 없으면 잘못된 요청
  if (!(req.body.category && req.body.post_name && req.body.content)) {
    return res.status(400).json({
      data: null,
      message: "category, post_name, content 중 누락된 항목이 있습니다.",
    });
  }
  if (!req.cookies.token) {
    return res
      .status(400)
      .json({ data: null, message: "토큰이 존재하지 않습니다." });
  }
  // 작성자 정보 토큰에서 꺼내옴
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
    // 유저 id 구해옴
    let user_info = await users.findOne({
      attributes: ["id"],
      where: {
        username: username,
      },
    });

    user_info = user_info.get({ plain: true });
    user_id = user_info.id;

    data = await posts.create({
      user_id,
      ...req.body,
    });
    data = data.get({ plain: true });
    delete data.userId;

    // id 명시적으로
    data.post_id = data.id;
    delete data.id;
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(201).json({ data: data, message: "ok" });
};
