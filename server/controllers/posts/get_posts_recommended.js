const {
  users,
  posts,
  kicks,
  comments,
  likes,
  posts_tags,
  tags,
  logs,
} = require("../../models");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = async (req, res) => {
  // TODO 추천 게시글 구현

  // 추천
  // 토큰으로 user 정보 받아와서 log 확인
  // type이 get_post 인것들만 받아옴
  // 받아온 게시글 정보로 게시글들의 태그 확인하고 태그 개수 구함
  // 많이 중복된 태그 위주로
  let data_by_tags = [];

  if (req.cookies.token) {
    const token = req.cookies.token.access_token;
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      decoded = null;
    }
    if (decoded) {
      // 토큰으로 로그 정보 확인
      // 로그에서 post_id 들 뽑아내고 게시글에 달린 태그 받아옴
      // 태그 정보 정리
      // 많이 나온 태그 기준 포스트 검색

      const { username } = decoded;
      let data;

      try {
        // 토큰 정보로 user_id 구함
        let user_info = await users.findOne({
          attributes: [["id", "user_id"]],
          where: {
            username: username,
          },
        });
        if (user_info) {
          const user_id = user_info.get({ plain: true }).user_id;

          // user_id로 로그 정보 20개까지 구함
          let log_info = await logs.findAll({
            attributes: ["content"],
            where: {
              user_id: user_id,
              type: "get_post",
            },
            offset: 0,
            limit: 20,
            order: [["id", "DESC"]],
          });

          // 로그 정보로 post_id 구함
          log_info = log_info.map((el) => {
            el = el.get({ plain: true });
            el = JSON.parse(el.content);
            return el.post_id;
          });

          // 최근 20개 로그에 post_id가 중복되는 경우는 없다고 가정
          const tag_id_obj = {};

          for (let el of log_info) {
            // post_id로 게시글에 달린 tag_id 구함
            const post_id = el;
            let posts_tags_info = await posts_tags.findAll({
              attributes: ["tag_id"],
              where: {
                post_id: post_id,
              },
              raw: true,
            });

            // tag_id_obj 에 정보 정리
            posts_tags_info.forEach((el) => {
              tag_id_obj[el.tag_id] = tag_id_obj[el.tag_id] + 1 || 1;
            });
          }
          // 여기까지 태그 정보 구함

          // 태그 id 정보가 존재한다면
          if (Object.keys(tag_id_obj).length !== 0) {
            let op_array = [];
            for (let el of Object.keys(tag_id_obj)) {
              op_array.push({ tag_id: tag_id_obj[el] });
            }
            console.log(op_array);

            let post_info = await posts.findAll({
              attributes: [
                ["id", "post_id"],
                "category",
                "post_name",
                "cost",
                "view_count",
                "favorite_count",
                "like_count",
                "created_at",
              ],
              where: {
                category: { [Op.like]: `%_킥%` },
              },
              distinct: true,
              limit: 6,
              order: [["id", "DESC"]],
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
                  attributes: [["id", "comment_id"], "content"],
                  order: [["id", "DESC"]],
                  include: [
                    {
                      model: users,
                      attributes: ["username", "profile", "created_at"],
                    },
                  ],
                },
                {
                  model: posts_tags,
                  attributes: ["tag_id"],
                  where: {
                    [Op.or]: op_array,
                  },
                  include: {
                    model: tags,
                    attributes: ["content"],
                  },
                },
              ],
            });
            post_info = post_info.map((el) => el.get({ plain: true }));
            data_by_tags = post_info;

            // 각 게시물에 접근
            data_by_tags.forEach((post) => {
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
              post.likes = likes_obj;

              // tags 가공
              post.tags = post.posts_tags.map((tag) => tag.tag.content);
              delete post.posts_tags;
            });
          }
        }
      } catch (err) {
        console.log(err);
        return res
          .status(500)
          .json({ data: err, message: "데이터베이스 에러" });
      }
    }
  }

  // 오늘의 킥
  // 최근 3일간 조회수 가장 높은 거 보여줌
  // 게시글 데이터 최근 3일간 가져오기
  // 조회수 기준으로 sort

  const today = new Date();
  const prev_3days = new Date(today - 3600000 * 24 * 3);

  let data_by_3days;
  try {
    data_by_3days = await posts.findAll({
      attributes: [
        ["id", "post_id"],
        "category",
        "post_name",
        "cost",
        "view_count",
        "favorite_count",
        "created_at",
      ],
      where: {
        category: { [Op.like]: `%_킥%` },
        created_at: {
          [Op.gt]: prev_3days,
        },
      },
      distinct: true,
      limit: 6,
      order: [["view_count", "DESC"]],
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
          attributes: [["id", "comment_id"], "content"],
          order: [["id", "DESC"]],
          include: [
            {
              model: users,
              attributes: ["username", "profile", "created_at"],
            },
          ],
        },
        {
          model: posts_tags,
          attributes: ["tag_id"],
          include: {
            model: tags,
            attributes: ["content"],
          },
        },
      ],
    });
    // 각 게시물에 접근
    data_by_3days.forEach((post) => {
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
      post.likes = likes_obj;

      // tags 가공
      post.tags = post.posts_tags.map((tag) => tag.tag.content);
      delete post.posts_tags;
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ data: err, message: "데이터베이스 에러" });
  }
  let data_by_time;

  try {
    data_by_time = await posts.findAll({
      attributes: [
        ["id", "post_id"],
        "category",
        "post_name",
        "cost",
        "view_count",
        "favorite_count",
        "created_at",
      ],
      where: {
        category: { [Op.like]: `%_킥%` },
      },
      distinct: true,
      limit: 6,
      order: [["id", "DESC"]],
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
          attributes: [["id", "comment_id"], "content"],
          order: [["id", "DESC"]],
          include: [
            {
              model: users,
              attributes: ["username", "profile", "created_at"],
            },
          ],
        },
        {
          model: posts_tags,
          attributes: ["tag_id"],
          include: {
            model: tags,
            attributes: ["content"],
          },
        },
      ],
    });
    // 각 게시물에 접근
    data_by_time.forEach((post) => {
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
      post.likes = likes_obj;

      // tags 가공
      post.tags = post.posts_tags.map((tag) => tag.tag.content);
      delete post.posts_tags;
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ data: err, message: "데이터베이스 에러" });
  }

  data = { data_by_3days, data_by_tags, data_by_time };

  return res.status(200).json({ data: data, message: "ok" });
};
