var db = require("../models");
var bcrypt = require("bcrypt");
var jwt = require("jwt-simple");

var checkJWT = function(req, res, next) {
  try {
    var user = jwt.decode(req.token, process.env.JWT_SECRET);
  } catch (error) {
    return next("token not validated");
  }
  req.user = user;
  next();
};

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/user", function(req, res) {
    console.log("this is a POST/user");

    db.User.create(req.body)
      .then(function() {
        return res.send(true);
      })
      .catch(function(err) {
        console.log(err);
        res.status(406).send("Database could not validate.");
      });
  });

  app.post("/api/signin", function(req, res) {
    db.User.findOne({ where: { username: req.body.username } })
      .then(function(user) {
        console.log(user);
        if (!user) {
          res.send("User not found.");
        }
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if (result) {
            return res.send(jwt.encode(user.id, process.env.JWT_SECRET));
          }
          return res.send("Unauthorized!");
        });
      })
      .catch(function(error) {
        res.send("Error");
      });
  });

  app.post("/api/post", checkJWT, function(req, res) {
    console.log(req.user);

    res.send("Posted");
  });

  app.use(function(err, req, res, next) {
    res.send("error handler");
  });
};

// Delete an example by id
// app.delete("/api/examples/:id", function(req, res) {
//   db.Example.destroy({ where: { id: req.params.id } }).then(function(
//     dbExample
//   ) {
//     res.json(dbExample);
//   });
// });
