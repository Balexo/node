const multer = require("multer");
const path = require("node:path");

const validateImageType = (req, file, callback) => {
  const allowedExtensions = ["jpg", "png", "pdf"];
  const fileExtension = file.originalname.split(".").pop().toLowerCase();

  if (allowedExtensions.includes(fileExtension)) {
    callback(null, true);
  } else {
    callback(new Error("Formats accepted are jpg, png and pdf"));
  }
};

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

const upload = multer({
  fileFilter: validateImageType,
  limits: { fileSize: 50000 },
  storage: storage,
});

module.exports = upload;
