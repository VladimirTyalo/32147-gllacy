(function () {
  "use strict";

  var express = require('express');
  var app = express();
  var path = require("path");
  var bodyParser = require("body-parser");


  app.set("port", (process.env.PORT || 8080));

  app.use(express.static(path.join(__dirname, "build")));
  app.use(bodyParser.urlencoded({extended: true}));


  app.engine('html', require('ejs').renderFile);


  app.set('view engine', 'html');

  app.set("views", "build");


  app.get("/", function (req, res) {
    res.render("index");
  });


  app.get("/index", function (req, res) {
    res.redirect("/");
  });

  app.get("/catalog", function (req, res) {
    res.render("catalog")
  });


  app.post("/submit", function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var text = req.body.text;
    // save info to DB here

    res.redirect("/");
  });


  app.get("/favicon.ico", function (req, res) {
    res.send("heroku needs favicon.ico path");
  });


  app.use(function (req, res) {
    res.sendStatus(404);
  });

  app.listen(app.get("port"), function () {
    console.log("Node app is running on port ", app.get("port"));
  });

})();
