const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

aws.config.update({
  accessKeyId: process.env.MULTER_KEY_ID,
  secretAccessKey: process.env.MULTER_ACCESS_KEY,
  region: process.env.MULTER_REGION,
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      let folder_name = req.params.folder_name;
      let extension = path.extname(file.originalname);
      cb(
        null,
        folder_name +
          "/" +
          path.basename(file.originalname, extension) +
          "_" +
          Date.now().toString() +
          extension
      );
    },
  }),
});

const destroy = (req, res) => {
  const files_info = req.body.files;
  var params = {
    Bucket: process.env.BUCKET_NAME,
    Delete: {
      Objects: files_info,
      Quiet: false,
    },
  };
  s3.deleteObjects(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      return res.status(500).json({ data: null, message: "데이터베이스 에러" });
    }
    console.log(data);
    return res.status(201).json({ data: data, message: "ok" });
  });
};

module.exports = { upload, destroy };
