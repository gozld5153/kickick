const {
  users,
  posts,
  kicks,
  users_kicks,
  comments,
  likes,
  posts_tags,
  tags,
} = require("../../models");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const fuzzy_searcher = require("../../functions/fuzzy_searcher");
const typo_searcher = require("../../functions/typo_searcher");

module.exports = async (req, res) => {
  // TODO 게시글 목록 조회 구현

  // page_num과 limit 기본값 설정
  const page_num = Number(req.query.page_num) || 1;
  const limit = Number(req.query.limit) || 10;

  delete req.query.page_num;
  delete req.query.limit;

  if (Object.keys(req.query).length === 0) {
    // TODO 쿼리가 없으면 쿠키로 검색 (쿠키로만 검색하는건 내 게시글 목록)

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
    let count;
    let { username } = decoded;

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
      const post_info = await posts.findAndCountAll({
        attributes: [
          ["id", "post_id"],
          "category",
          "post_name",
          "content",
          "cost",
          "view_count",
          "favorite_count",
          "like_count",
          "created_at",
        ],
        offset: limit * (page_num - 1),
        limit: limit,
        distinct: true,
        order: [["id", "DESC"]],
        where: {
          user_id: user_id,
        },
        include: [
          {
            model: users,
            attributes: ["username", "profile"],
            where: {
              username: username,
            },
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
            model: comments,
            attributes: [["id", "comment_id"], "content"],
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
      data = post_info.rows.map((el) => el.get({ plain: true }));
      count = post_info.count;
    } catch (err) {
      console.log(err);
      return res.status(500).json({ data: err, message: "데이터베이스 에러" });
    }

    // 각 게시물에 접근
    data.forEach((post) => {
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

      // comments 카운트
      post.comments = post.comments.length;
    });

    return res.status(200).json({ count: count, data: data, message: "ok" });
  }

  // TODO 쿼리가 존재하면 쿼리로 검색

  // 토큰이 있으면 샀는지 안샀는지 확인을 위해 user_id 구함
  let user_id;
  if (req.cookies.token) {
    const token = req.cookies.token.access_token;
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      const { username } = decoded;
      let user_info = await users.findOne({
        attributes: [["id", "user_id"]],
        where: {
          username: username,
        },
        raw: true,
      });
      user_id = user_info.user_id;
    } catch (err) {
      user_id = null;
    }
  }

  // 포함검색 구현 query 상황에 따라 where_obj 분기

  let where_obj = {};
  if (req.query.category) where_obj.category = req.query.category;
  if (req.query.post_name) {
    let regexp = fuzzy_searcher(req.query.post_name);
    let typo_arr = typo_searcher(req.query.post_name);
    let where_or_arr = [];

    where_or_arr.push({ [Op.regexp]: regexp });
    typo_arr.forEach((el) => {
      where_or_arr.push({
        [Op.like]: `%${el}%`,
      });
    });

    where_obj.post_name = {
      [Op.or]: where_or_arr,
    };
  }
  if (req.query.content)
    where_obj.content = {
      [Op.like]: `%${req.query.content}%`,
    };
  // 즐겨찾기 일정 개수 이상 검색 추가
  if (req.query.favorite_count) {
    where_obj.favorite_count = {
      [Op.gte]: Number(req.query.favorite_count),
    };
  }
  // like_count 검색 추가
  if (req.query.like_count) {
    where_obj.like_count = {
      [Op.gte]: Number(req.query.like_count),
    };
  }

  // 글쓴이 태그 검색 추가
  let users_where_obj = {};
  if (req.query.username) {
    users_where_obj.username = req.query.username;
  }
  let tags_where_obj = {};
  if (req.query.tag) {
    tags_where_obj.content = req.query.tag;
  }

  let data;
  let count;

  try {
    let post_info = await posts.findAndCountAll({
      attributes: [
        ["id", "post_id"],
        "category",
        "post_name",
        "content",
        "cost",
        "view_count",
        "favorite_count",
        "like_count",
        "created_at",
      ],
      distinct: true,
      where: where_obj,
      offset: limit * (page_num - 1),
      limit: limit,
      order: [["id", "DESC"]],
      include: [
        {
          model: users,
          attributes: ["username", "profile"],
          where: users_where_obj,
        },
        {
          model: likes,
          attributes: ["agreement"],
        },
        {
          model: kicks,
          attributes: [["id", "kick_id"], "thumbnail"],
          include: [
            {
              model: users_kicks,
              attributes: ["user_id"],
            },
          ],
        },
        {
          model: comments,
          attributes: [["id", "comment_id"], "content"],
          order: [["id", "DESC"]],
        },
        {
          model: posts_tags,
          attributes: ["tag_id"],
          include: {
            model: tags,
            attributes: ["content"],
            where: tags_where_obj,
          },
        },
      ],
    });
    count = post_info.count;
    data = post_info.rows.map((el) => el.get({ plain: true }));

    // 각 게시물에 접근
    data.forEach((post) => {
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

      // user_id 로 샀는지 안샀는지 확인하고 값 추가
      // post.kick.kick_id로 확인
      post.is_purchased = false;
      if (post.kick) {
        if (user_id && post.kick.users_kicks.length !== 0) {
          for (let el of post.kick.users_kicks) {
            if (el.user_id === user_id) {
              post.is_purchased = true;
              break;
            }
          }
          delete post.kick.users_kicks;
        }
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(200).json({ count: count, data: data, message: "ok" });
};
