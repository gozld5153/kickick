const {
  get_notices_info,
  post_notices_info,
  put_notices_info,
  delete_notices_info,
  get_notices_list,
} = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/info", get_notices_info);
router.post("/info", post_notices_info);
router.put("/info/:notice_id", put_notices_info);
router.delete("/info/:notice_id", delete_notices_info);
router.get("/list", get_notices_list);

module.exports = router;
