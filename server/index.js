require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
  },
});

const test_router = require("./routers/test_router");
const users_router = require("./routers/users_router");
const auth_router = require("./routers/auth_router");
const posts_router = require("./routers/posts_router");
const notices_router = require("./routers/notices_router");
const kicks_router = require("./routers/kicks_router");
const tags_router = require("./routers/tags_router");
const comments_router = require("./routers/comments_router");
const likes_router = require("./routers/likes_router");
const favorites_router = require("./routers/favorites_router");
const alarms_router = require("./routers/alarms_router");
const logs_router = require("./routers/logs_router");
const bucket_router = require("./routers/bucket_router");
const cookies_router = require("./routers/cookies_router");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(cookieParser());

// 라우팅
app.use("/test", test_router);
app.use("/users", users_router);
app.use("/auth", auth_router);
app.use("/posts", posts_router);
app.use("/notices", notices_router);
app.use("/kicks", kicks_router);
app.use("/tags", tags_router);
app.use("/comments", comments_router);
app.use("/likes", likes_router);
app.use("/favorites", favorites_router);
app.use("/alarms", alarms_router);
app.use("/logs", logs_router);
app.use("/bucket", bucket_router);
app.use("/cookies", cookies_router);

app.get("/", (req, res) => {
  res.status(201).send("Hello World");
});

const HTTP_PORT = process.env.HTTP_PORT || 80;

require("./controllers/socket")(io);

module.exports = server.listen(HTTP_PORT, () => console.log(HTTP_PORT));
