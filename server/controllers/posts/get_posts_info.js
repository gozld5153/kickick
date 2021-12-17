const {
  users,
  posts,
  kicks,
  likes,
  posts_tags,
  favorites,
  tags,
  logs,
} = require("../../models");
const sequelize = require("sequelize");
const jwt = require("jsonwebtoken");

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
        ["id", "post_id"],
        "user_id",
        "category",
        "post_name",
        "content",
        "cost",
        "view_count",
        "favorite_count",
        "like_count",
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
          attributes: [["id", "kick_id"], "thumbnail"],
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
          id: data.post_id,
        },
      }
    );
    // log 기록 토큰부터 있는지 확인
    if (req.cookies.token) {
      const token = req.cookies.token.access_token;
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      } catch (err) {
        console.log(err);
        decoded = null;
      }
      // 토큰이 있고 만료되지 않았다면
      if (decoded) {
        const { username } = decoded;

        // user_id 구함
        let user_info = await users.findOne({
          attributes: [["id", "user_id"]],
          where: {
            username: username,
          },
          include: [
            {
              model: favorites,
              where: {
                post_id: post_id,
              },
              required: false,
            },
          ],
        });
        user_info = user_info.get({ plain: true });

        // 즐겨찾기를 눌렀으면
        if (user_info.favorites.length !== 0) {
          data.favorite = "true";
        } else {
          data.favorite = "false";
        }
        const user_id = user_info.user_id;

        // like 정보 가져옴
        let like_info = await likes.findOne({
          attributes: ["agreement"],
          where: {
            user_id: user_id,
            post_id: post_id,
          },
        });

        // like_info 가 존재하면 agreement 달아서 보내줌
        if (like_info) {
          data.is_liked = like_info.agreement;
        } else {
          data.is_liked = null;
        }

        // logs 추가하기전에 최근 20개 가져와서 post_id가 동일한게 있는지 확인
        let log_info = await logs.findAll({
          attributes: ["content"],
          where: {
            user_id: user_id,
            type: "get_post",
          },
          offset: 0,
          limit: 20,
          order: [["id", "DESC"]],
          raw: true,
        });

        let is_watched = false;
        for (let el of log_info) {
          el = JSON.parse(el.content);
          if (post_id === el.post_id) {
            is_watched = true;
            break;
          }
        }

        // logs에 추가
        if (!is_watched) {
          await logs.create({
            user_id: user_id,
            type: "get_post",
            content: JSON.stringify({
              post_id: post_id,
            }),
          });
        }
      }
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
    data.tags = data.posts_tags.map((tag) => {
      tag.content = tag.tag.content;
      delete tag.tag;
      return tag;
    });
    delete data.user_id;
    delete data.posts_tags;
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(200).json({ data: data, message: "ok" });
};
