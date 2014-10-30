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

router.get("/chart", function(req, res) {
    res.render("chart.html", {});
});

router.get("/lessons", function(req, res) {
    res.render("lessons.html", {});
});

router.get("/quizzes", function(req, res) {
    res.render("quizzes.html", {});
});

router.get("/highScores", function(req, res) {
    res.render("highScores.html", {});
});

router.get("/lesson1", function(req, res) {
    res.render("lesson1.html", {});
});



module.exports = router;