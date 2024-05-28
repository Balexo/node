var express = require("express");
var router = express.Router();
const { user } = require("../../models");

/* GET users listing. */
router.get("/", function (req, res, next) {
  try {
    res.send({ results: user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
