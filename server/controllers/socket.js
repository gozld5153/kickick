const { users, alarms } = require("./../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = (io) => {
  let clients = [];
  io.sockets.on("connection", (socket) => {
    console.log("connection");
    // 사용자 socket 로그인 clients 배열에 저장
    socket.on("signin", (data) => {
      let client_info = new Object();
      client_info.username = data.username;
      client_info.id = socket.id;
      // if (!client_info.username) return;
      let is_signed = false;
      // for (let el of clients) {
      //   if (el.username === client_info.username) {
      //     el.id = client_info.id;
      //     is_signed = true;
      //     break;
      //   }
      // }
      if (!is_signed) clients.push(client_info);
      console.log(clients);
    });
    // 알람 보내기 요청 들어오면
    socket.on("alarms", async (data) => {
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].username === data.username) {
          // 받아온 data 값 변수에 할당
          const username = data.username;
          const limit = Number(data.limit) || 10;
          const page_num = Number(data.page_num) || 1;
          let count;
          let all_count;

          try {
            // username 으로 user_id 구함
            let user_info = await users.findOne({
              attributes: [["id", "user_id"]],
              where: {
                username: username,
              },
              raw: true,
            });
            const user_id = user_info.user_id;

            // data에 DB 검색 값 할당
            data = await alarms.findAndCountAll({
              attributes: [
                ["id", "alarm_id"],
                "type",
                "reference",
                "content",
                "is_checked",
                "created_at",
              ],
              where: {
                [Op.or]: [
                  {
                    user_id: user_id,
                  },
                  {
                    user_id: null,
                  },
                ],
                is_checked: false,
              },
              order: [["id", "DESC"]],
              offset: limit * (page_num - 1),
              limit: limit,
            });

            all_count = data.count;
            data = data.rows;

            // count는 공지이외의 것만, type alarms
            count = await alarms.findAndCountAll({
              attributes: [
                ["id", "alarm_id"],
                "type",
                "reference",
                "content",
                "is_checked",
                "created_at",
              ],
              where: {
                [Op.or]: [
                  {
                    user_id: user_id,
                  },
                ],
                type: "alarms",
                is_checked: false,
              },
            });
            count = count.count;

            // reference 필드 파싱
            data = data.map((el) => {
              el = el.get({ plain: true });
              el.reference = JSON.parse(el.reference);
              return el;
            });
          } catch (err) {
            console.log(err);
            break;
          }

          // 원하는 클라이언트에 실시간 알림
          io.to(clients[i].id).emit("alarms", {
            all_count: all_count,
            count: count,
            data: data,
          });
        }
      }
    });
    // broadcast 요청 들어오면
    socket.on("broadcast", () => {
      console.log("broadcast");
      io.emit("broadcast", { data: "test" });
    });

    // 연결 끊김
    socket.on("disconnect", () => {
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].id === socket.id) {
          clients.splice(i, 1);
          break;
        }
      }
      console.log("disconnect");
      console.log(clients);
    });
  });
};
