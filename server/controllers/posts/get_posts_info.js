const {
  users,
  posts,
  kicks,
  comments,
  likes,
  posts_tags,
  tags,
} = require("../../models");
const sequelize = require("sequelize");

module.exports = async (req, res) => {
  // TODO 게시글 정보(단독) 요청 구현
  if (!req.query.post_id) {
    return res
      .status(400)
      .json({ data: null, message: "post_id가 누락되었습니다." });
  }

  const post_id = Number(req.query.post_id);

  let data;

  try {
    data = await posts.findOne({
      attributes: [
        "id",
        "user_id",
        "category",
        "post_name",
        "content",
        "cost",
        "view_count",
        "created_at",
      ],
      where: {
        id: post_id,
      },
      include: [
        {
          model: users,
          attributes: ["username", "profile"],
        },
        {
          model: likes,
          attributes: ["agreement"],
        },
        {
          model: kicks,
          attributes: ["id", "thumbnail"],
        },
        {
          model: comments,
          attributes: ["id", "content", "created_at"],
          include: [
            {
              model: users,
              attributes: ["username", "profile"],
            },
          ],
        },
        {
          model: posts_tags,
          attributes: ["tag_id"],
          include: [
            {
              model: tags,
              attributes: ["content"],
            },
          ],
        },
      ],
    });
    data = data.get({ plain: true });
    // 조회수 증가
    await posts.update(
      {
        view_count: sequelize.literal(`view_count + 1`),
      },
      {
        where: {
          id: data.id,
        },
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  // likes 가공
  let likes_obj = {
    true: 0,
    false: 0,
  };
  data.likes.forEach((like) => {
    if (like.agreement) {
      likes_obj.true += 1;
    } else {
      likes_obj.false += 1;
    }
  });
  data.likes = likes_obj;
  // tags 가공
  data.tags = data.posts_tags.map((tag) => tag.tag.content);
  delete data.user_id;
  delete data.posts_tags;

  return res.status(200).json({ data: data, message: "ok" });
};