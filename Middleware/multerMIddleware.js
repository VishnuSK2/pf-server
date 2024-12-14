const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    const fileName = `image-${Date.now()}-${file.originalname}`;
    callback(null, fileName);
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
    return callback(
      new Error("Please upload following file extenstions (jpg/ jpeg/ png")
    );
  }
};

const multerConfig = multer({
  storage,
  fileFilter,
});

module.exports = multerConfig;
