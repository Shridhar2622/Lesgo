const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const name = file.originalname.split(".")[0]; // file name without extension
    const ext = path.extname(file.originalname);  // .jpg, .png, etc
    const uniqueName = `${name}-${Date.now()}${ext}`;

    cb(null, uniqueName);
  }
});

const checkFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("This is not an image, please upload an image"));
  }
};

module.exports = multer({
  storage: storage,
  fileFilter: checkFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
});
