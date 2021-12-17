const { get_cookies_info, post_cookies_info } = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/info", get_cookies_info);
router.post("/info", post_cookies_info);

module.exports = router;
