var express = require("express");
var router = express.Router();
const Adds = require("../../models/add");
const upload = require("../../lib/publicUploadImage");

//POST api/adds (body)
//Create a new add

router.post("/", upload.single("photo"), async function (req, res, next) {
  try {
    const dataAdd = req.body;

    console.log(req.file);

    const add = new Adds(dataAdd); ///api/adds
    add.photo = req.file.filename;

    const addSaved = await add.save();

    res.json({ result: addSaved });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
