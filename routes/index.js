var express = require('express');
var router = express.Router();

router.get("/", function(req, res) {
  res.render("home.html", {});
});

router.get("/info", function(req, res) {
	res.render("info.html", {});
});

router.get("/quiz", function(req, res) {
    res.render("quiz.html", {});
});

router.get("/example", function(req, res) {
    res.render("example.html", {});
});

module.exports = router;