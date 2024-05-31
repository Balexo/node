const multer = require("multer");
const path = require("node:path");

//Almacenar imagen
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const route = path.join(__dirname, "..", "public", "images");
    callback(null, route);
  },
  filename: function (req, file, callback) {
    try {
      const uniqueImageName =
        file.fieldname + "-" + Date.now() + "-" + file.originalname;
      callback(null, uniqueImageName);
    } catch (error) {
      callback(error);
    }
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
