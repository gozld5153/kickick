const { notices, users } = require("../../models");

module.exports = async (req, res) => {
  // TODO 공지 정보 (단독) 요청 구현
  if (!req.query.notice_id) {
    return res
      .status(400)
      .json({ data: null, message: "notice_id가 누락되었습니다." });
  }
  const notice_id = req.query.notice_id;
  let data;
  try {
    data = await notices.findOne({
      attributes: [
        ["id", "notice_id"],
        "type",
        "notice_name",
        "thumbnail",
        "summary",
        "content",
        "created_at",
      ],
      where: {
        id: notice_id,
      },
      include: {
        model: users,
        attributes: ["username", "profile"],
      },
    });
    if (!data) {
      return res
        .status(400)
        .json({
          data: null,
          message: "notice_id가 일치하는 공지가 존재하지 않습니다.",
        });
    }
    data = data.get({ plain: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(200).json({ data: data, message: "ok" });
};
