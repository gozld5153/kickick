const { users, notices } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 공지 수정 구현
  if (!req.params.notice_id) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
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

  const notice_id = req.params.notice_id;
  const { type } = decoded;

  try {
    // // 토큰정보로 user_id 가져옴
    // let user_info = await users.findOne({
    //   attributes: ["id"],
    //   where: {
    //     username: username,
    //   },
    // });

    // user_info = user_info.get({ plain: true });
    // const user_id = user_info.id;
    // // notice_id로 notice_info 가져옴
    // let notice_info = await notices.findOne({
    //   where: {
    //     id: notice_id,
    //   },
    // });
    // notice_info = notice_info.get({ plain: true });
    // user_id가 일치하지 않으면 권한 x
    // 관리자면 권한 ok
    if (type !== "admin") {
      return res.status(401).json({ data: err, message: "권한이 없습니다." });
    }
    // 공지 수정
    await notices.update(req.body, {
      where: {
        id: notice_id,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(201).json({ data: null, message: "ok" });
};
