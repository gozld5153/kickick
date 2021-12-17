const {
  get_users_info,
  post_users_info,
  put_users_info,
  delete_users_info,
} = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/info", get_users_info);
router.post("/info", post_users_info);
router.put("/info", put_users_info);
router.delete("/info", delete_users_info);

module.exports = router;
