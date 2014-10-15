var express = require("express");
var app = express();

app.get("/", function(req, res) {
    //res.render("default.html");
    res.send("~~ Invest! ~~");
});

var server = app.listen(3000, function() {
    console.log("Listening on port 3000");
});