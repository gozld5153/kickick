const {
  get_posts_info,
  get_posts_list,
  post_posts_info,
  put_posts_info,
  delete_posts_info,
  get_posts_recommended,
  get_posts_classification,
} = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/info", get_posts_info);
router.get("/list", get_posts_list);
router.post("/info", post_posts_info);
router.put("/info/:post_id", put_posts_info);
router.delete("/info/:post_id", delete_posts_info);
router.get("/recommended", get_posts_recommended);
router.get("/classification", get_posts_classification);

module.exports = router;
