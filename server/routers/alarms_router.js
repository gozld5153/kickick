const {
  get_alarms_info,
  post_alarms_info,
  put_alarms_info,
  delete_alarms_info,
} = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/info", get_alarms_info);
router.post("/info", post_alarms_info);
router.put("/info/:alarm_id", put_alarms_info);
router.delete("/info/:alarm_id", delete_alarms_info);

module.exports = router;
