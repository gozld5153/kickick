const { users, posts, kicks, users_kicks } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 킥 생성 구현
  if (!(req.body.post_id && req.body.content)) {
    return res.status(400).json({
      data: null,
      message: "post_id, content 중 누락된 항목이 있습니다.",
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
  const post_id = req.body.post_id;
  let data;

  try {
    // 토큰으로 받아온 username으로 검색해서 user_id 구함
    let user_info = await users.findOne({
      attributes: ["id"],
      where: {
        username: username,
      },
    });
    user_info = user_info.get({ plain: true });
    const user_id = user_info.id;
    // post_id로 게시글 검색 후 user_id 가 동일한지 확인
    let post_info = await posts.findOne({
      attributes: ["user_id"],
      where: {
        id: post_id,
      },
    });
    post_info = post_info.get({ plain: true });
    // 동일하지 않으면 권한 x
    if (user_id !== post_info.user_id) {
      return res.status(401).json({ data: err, message: "권한이 없습니다." });
    }
    // kick 이미 존재하는지 확인
    let kick_info = await kicks.findOne({
      where: {
        post_id: post_id,
      },
    });

    if (kick_info) {
      return res.status(400).json({
        data: null,
        message: "한 게시글에 2개의 킥을 만들 수 없습니다.",
      });
    }
    // kick 생성
    data = await kicks.create(req.body);
    data = data.get({ plain: true });

    // users_kicks 생성
    await users_kicks.create({
      user_id: user_id,
      kick_id: data.id,
    });

    delete data.postId;

    // id 명시적으로
    data.kick_id = data.id;
    delete data.id;
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(201).json({ data: data, message: "ok" });
};
