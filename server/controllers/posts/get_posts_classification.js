const { users, posts, likes } = require("../../models");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = async (req, res) => {
  // TODO 게시글 분류 카운트 조회 구현

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

  let data;
  let { username } = decoded;
  let post_info;
  let free_info;

  try {
    // username으로 user_id 구함
    let user_info = await users.findOne({
      attributes: [["id", "user_id"]],
      where: {
        username: username,
      },
      raw: true,
    });
    const user_id = user_info.user_id;
    post_info = await posts.findAll({
      attributes: [["id", "post_id"]],
      order: [["id", "DESC"]],
      where: {
        user_id: user_id,
        category: {
          [Op.like]: `%_킥%`,
        },
      },
      include: [
        {
          model: likes,
          attributes: ["agreement"],
        },
      ],
    });

    // 자유게시판 글
    free_info = await posts.findAll({
      attributes: [["id", "post_id"]],
      order: [["id", "DESC"]],
      where: {
        user_id: user_id,
        category: {
          [Op.notLike]: `%_킥%`,
        },
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }
  const alien = [];
  const astronaut = [];
  const common = [];

  // 각 게시물에 접근
  post_info.forEach((post) => {
    post = post.get({ plain: true });

    // likes 가공
    let likes_obj = {
      true: 0,
      false: 0,
    };
    post.likes.forEach((like) => {
      if (like.agreement) {
        likes_obj.true += 1;
      } else {
        likes_obj.false += 1;
      }
    });

    // 우주인 글 외계인 글 분류
    if (likes_obj.true + likes_obj.false < 5) {
      common.push(post);
    } else if (likes_obj.true > likes_obj.false) {
      alien.push(post);
    } else if (likes_obj.true < likes_obj.false) {
      astronaut.push(post);
    } else {
      common.push(post);
    }
  });

  data = {
    total: post_info.length,
    alien: alien.length,
    astronaut: astronaut.length,
    common: common.length,
    free: free_info.length,
  };

  return res.status(200).json({ data: data, message: "ok" });
};
