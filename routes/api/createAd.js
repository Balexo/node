var express = require("express");
var router = express.Router();
const Ads = require("../../models/add");
const upload = require("../../lib/publicUploadImage");
const { Requester } = require("cote");

// POST api/adds (body)
// Create a new ad

router.post("/", upload.single("photo"), async function (req, res, next) {
  try {
    const dataAd = req.body;

    const ad = new Ads(dataAd);
    ad.photo = req.file.filename;

    const adSaved = await ad.save();

    const requester = new Requester({ name: "thumbnail" });

    const event = {
      type: "transform-image",
      image: req.file.filename,
    };

    requester.send(event, (result) => {
      console.log(
        Date.now(),
        "Image transform to thumbnail:",
        req.file.filename,
      );
    });

    res.json({ result: adSaved });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
