const {
  get_likes_info,
  post_likes_info,
  delete_likes_info,
} = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/info", get_likes_info);
router.post("/info", post_likes_info);
router.delete("/info/:post_id", delete_likes_info);

module.exports = router;
