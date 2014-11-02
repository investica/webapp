var express = require("express");
var app = express();
var port = process.env.PORT || $PORT || 3000;


var router = require('./routes');

//sets the contents in public to be static and always accessible. That way we can access .css files, etc.
app.use(express.static(__dirname + '/public'));

//sets the view engine to ejs !!
app.set('view engine', 'ejs');
app.engine('.html', require('ejs').renderFile);

//middleware function for router
app.use(function(req,res,next){
    next();
});

app.use('/',router);

var server = app.listen(port, function() {
    console.log("Listening on port 3000");
});