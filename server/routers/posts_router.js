const {
  get_posts_info,
  get_posts_list,
  post_posts_info,
} = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/info", get_posts_info);
router.get("/list", get_posts_list);
router.post("/info", post_posts_info);

module.exports = router;
