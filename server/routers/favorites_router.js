const {
  get_favorites_info,
  post_favorites_info,
  delete_favorites_info,
} = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/info", get_favorites_info);
router.post("/info", post_favorites_info);
router.delete("/info/:post_id", delete_favorites_info);

module.exports = router;
