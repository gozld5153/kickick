module.exports = async (req, res) => {
  // TODO 쿠키정보 생성 및 수정 구현
  if (!req.cookies) {
    return res
      .status(400)
      .json({ data: null, message: "쿠키가 존재하지 않습니다." });
  }

  if (!req.body.is_visited) {
    return res
      .status(400)
      .json({ data: null, message: "수정할 쿠키내용이 존재하지 않습니다." });
  }
  const is_visited = req.body.is_visited;

  let data = {
    ...req.cookies,
    is_visited: is_visited,
  };

  if (data.token) {
    delete data.token;
    data.token = true;
  }

  return res
    .status(200)
    .cookie("is_visited", is_visited, {
      httpOnly: true,
    })
    .json({ data: data, message: "ok" });
};
