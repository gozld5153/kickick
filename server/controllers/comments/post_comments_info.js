const { users, posts, comments, alarms } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 댓글 생성 구현
  if (!(req.body.post_id && req.body.content)) {
    return res
      .status(400)
      .json({ data: null, message: "post_id, content 항목이 누락되었습니다." });
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
  let data;
  const post_id = req.body.post_id;

  try {
    // 토큰으로 user_id 구함
    let user_info = await users.findOne({
      attributes: [["id", "user_id"]],
      where: {
        username: username,
      },
    });
    const user_id = user_info.get({ plain: true }).user_id;

    // 댓글 생성
    data = await comments.create({
      user_id,
      ...req.body,
    });
    data = data.get({ plain: true });
    delete data.user_id;
    delete data.postId;
    delete data.userId;
    delete data.updated_at;

    // id 명시적으로
    data.comment_id = data.id;
    delete data.id;
    // data 에 username 추가
    data.username = username;

    // 게시글 작성자에 알림
    // req.body.post_id 로 작성자 id 구함
    let post_info = await posts.findOne({
      where: {
        id: post_id,
      },
      include: [
        {
          model: users,
          attributes: [["id", "user_id"]],
        },
      ],
    });
    post_info = post_info.get({ plain: true });

    // 내가 쓴 게시글이면 알람 x
    if (post_info.user.user_id !== user_id) {
      // 작성자 id로 alarms 테이블에 추가 type comment

      await alarms.create({
        user_id: post_info.user.user_id,
        type: "alarms",
        reference: JSON.stringify({
          table: "posts",
          id: post_id,
        }),
        content: `${username}님이 내 게시글에 댓글을 달았습니다.`,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(201).json({ data: data, message: "ok" });
};
