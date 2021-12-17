const { upload, destroy } = require("../controllers");
const express = require("express");
const router = express.Router();

router.post(
  "/upload/single/:folder_name",
  upload.single("img"),
  function (req, res, next) {
    res.json({
      data: { location: req.file.location, version_id: req.file.versionId },
      message: "ok",
    });
  }
);

router.post(
  "/upload/array/:folder_name",
  upload.array("img"),
  function (req, res, next) {
    let data = req.files.map((el) => {
      return {
        location: el.location,
        version_id: el.versionId,
      };
    });
    res.json({ data: data, message: "ok" });
  }
);

router.post("/destroy", destroy);

module.exports = router;
