const { users, posts, likes, alarms, kicks } = require("../../models");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");

module.exports = async (req, res) => {
  // TODO 좋아요 생성 및 수정
  // 이미 존재하면 수정 / 존재하지 않으면 생성
  if (!(req.body.post_id && req.body.agreement && req.cookies.token)) {
    return res.status(400).json({
      data: null,
      message: "post_id, agreement, 토큰 중 누락된 항목이 있습니다.",
    });
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

  const { username } = decoded;
  const post_id = req.body.post_id;
  let data;

  try {
    // 토큰으로 user_id 구함
    let user_info = await users.findOne({
      attributes: ["id"],
      where: {
        username: username,
      },
    });

    const user_id = user_info.get({ plain: true }).id;

    // 이미 좋아요 버튼을 누른적이 있는지 확인
    data = await likes.findOne({
      attributes: [
        ["id", "like_id"],
        "user_id",
        "post_id",
        "agreement",
        "created_at",
        "updated_at",
      ],
      where: {
        user_id: user_id,
        post_id: post_id,
      },
    });

    // 누른적 있으면 업데이트
    if (data) {
      data = data.get({ plain: true });
      await likes.update(
        {
          ...req.body,
          user_id: user_id,
        },
        {
          where: {
            id: data.like_id,
          },
        }
      );
    } else {
      // 누른 적 없으면 생성
      data = await likes.create({
        ...req.body,
        user_id: user_id,
      });
      data = data.get({ plain: true });
      delete data.postId;
      delete data.userId;

      // id 명시적으로
      data.like_id = data.id;
      delete data.id;
      // like_count 업데이트
      await posts.update(
        {
          like_count: sequelize.literal(`like_count + 1`),
        },
        {
          where: {
            id: post_id,
          },
        }
      );
    }

    // post_id 로 like_info 가져와서 투표수 총합 확인
    let like_info = await likes.findAndCountAll({
      attributes: [["id", "like_id"]],
      where: {
        post_id: post_id,
      },
    });
    const like_count = like_info.count;

    // 총 투표수가 10이상이면 alarm 생성
    if (like_count === 10) {
      // post_id로 작성자 아이디 구함
      let post_info = await posts.findOne({
        attributes: ["user_id"],
        where: {
          id: post_id,
        },
        include: [
          {
            model: kicks,
            attributes: ["id", "kick_id"],
          },
        ],
      });
      post_info = post_info.get({ plain: true });

      const post_user_id = post_info.user_id;
      const kick_id = post_info.kick_id;

      await alarms.create({
        user_id: post_user_id,
        type: "likes",
        reference: JSON.stringify({
          table: "kicks",
          id: kick_id,
        }),
        content: `내 게시글이 추천을 10개 받았습니다.`,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(201).json({ data: data, message: "ok" });
};
