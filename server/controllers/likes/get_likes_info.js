const { users, posts, likes } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 좋아요 정보 조회 구현
  // post_id로 현재 게시글의 좋아요 정보 조회
  if (req.query.post_id) {
    const post_id = Number(req.query.post_id);
    let data;
    try {
      data = await posts.findOne({
        attributes: [["id", "post_id"], "post_name"],
        where: {
          id: post_id,
        },
        include: [
          {
            model: likes,
            attributes: [["id", "like_id"],"user_id", "post_id", "agreement", "created_at"],
            include: [
              {
                model: users,
                attributes: ["username", "profile"],
              },
            ],
          },
        ],
      });
      data = data.get({ plain: true });
      // data 가공
      const true_arr = [];
      const false_arr = [];
      let likes_obj = {
        true: true_arr,
        false: false_arr,
        true_count: 0,
        false_count: 0,
      };
      data.likes.forEach((el) => {
        delete el.user_id;
        delete el.post_id;
        if (el.agreement) {
          true_arr.push(el);
        } else {
          false_arr.push(el);
        }
      });
      likes_obj.true_count = true_arr.length;
      likes_obj.false_count = false_arr.length;
      data = likes_obj;
      // 이게시글에 투표를 했는지 안했는지 확인
      if (data) {
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

        let user_info = await users.findOne({
          attributes:[["id","user_id"]],
          where: {
            username:username
          },
          raw:true
        })
        const user_id = user_info.user_id;

        let like_info = await likes.findOne({
          attributes:["agreement"],
          where: {
            user_id: user_id,
            post_id : post_id
          }
        })

        data.is_liked = null;

        if (like_info) {
          data.is_liked = like_info.agreement;
        }
      }

    } catch (err) {
      console.log(err);
      return res.status(500).json({ data: null, message: "데이터베이스 에러" });
    }

    return res.status(200).json({ data: data, message: "ok" });
  }

  // token으로 내가 좋아요 버튼 누른 목록 조회
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

  const { username } = decoded;
  let data;

  try {
    data = await users.findOne({
      attributes: ["username"],
      where: {
        username: username,
      },
      include: [
        {
          model: likes,
          attributes: [["id", "like_id"],"agreement", "created_at"],
          include: [
            {
              model: posts,
              attributes: [["id", "post_id"], "post_name", "view_count"],
            },
          ],
        },
      ],
    });
    data = data.get({ plain: true });
    // data 가공
    const true_arr = [];
    const false_arr = [];
    let likes_obj = { true: true_arr, false: false_arr };
    data.likes.forEach((el) => {
      delete post_id;
      if (el.agreement) {
        true_arr.push(el);
      } else {
        false_arr.push(el);
      }
    });
    data = likes_obj;
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err, message: "데이터베이스 에러" });
  }

  return res.status(200).json({ data: data, message: "ok" });
};
