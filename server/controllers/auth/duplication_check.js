const { users } = require("../../models");

module.exports = async (req, res) => {
  // TODO email 또는 username 중복체크
  if (!(req.body.email || req.body.username)) {
    return res
      .status(400)
      .json({ data: null, message: "email과 username이 누락되었습니다." });
  }
  // email 중복체크
  if (req.body.email) {
    let data;
    try {
      data = await users.findOne({
        where: {
          email: req.body.email,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ data: err, message: "데이터베이스 에러" });
    }
    if (data)
      return res
        .status(400)
        .json({ data: null, message: "중복되는 email이 존재합니다." });
    return res.status(200).json({ data: null, message: "ok" });
  }
  // username 중복체크
  if (req.body.username) {
    let data;
    try {
      data = await users.findOne({
        where: {
          username: req.body.username,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ data: err, message: "데이터베이스 에러" });
    }
    if (data)
      return res
        .status(400)
        .json({ data: null, message: "중복되는 username이 존재합니다." });
    return res.status(200).json({ data: null, message: "ok" });
  }
};
