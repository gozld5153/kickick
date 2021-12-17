const {
  get_comments_info,
  post_comments_info,
  put_comments_info,
  delete_comments_info,
} = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/info", get_comments_info);
router.post("/info", post_comments_info);
router.put("/info/:comment_id", put_comments_info);
router.delete("/info/:comment_id", delete_comments_info);

module.exports = router;
