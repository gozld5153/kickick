const {
  get_tags_info,
  post_tags_info,
  delete_tags_info,
} = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/info", get_tags_info);
router.post("/info", post_tags_info);
router.delete("/info/:post_id/:tag_id", delete_tags_info);

module.exports = router;
