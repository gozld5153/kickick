const { logs } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 로그 삭제 구현
  if (!req.params.log_id) {
    return res
      .status(400)
      .json({ data: null, message: "log_id가 누락되었습니다." });
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

  const { type } = decoded;
  const log_id = req.params.log_id;
  console.log(decoded);

  // 관리자가 아니면 권한 x
  if (type !== "admin") {
    return res.status(401).json({ data: null, message: "권한이 없습니다." });
  }

  try {
    await logs.destroy({
      where: {
        id: log_id,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(201).json({ data: null, message: "ok" });
};
