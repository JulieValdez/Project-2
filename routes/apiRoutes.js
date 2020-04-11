var db = require("../models");
var bcrypt = require("bcrypt");
var jwt = require("jwt-simple");

require("dotenv").config();

var checkJWT = function(req, res, next) {
  try {
    var user = jwt.decode(req.token, process.env.JWT_SECRET);
  } catch (error) {
    next();
    return next({
      status: 401,
      message: "token not validated"
    });
  }
  req.user = user;
  next();
};

module.exports = function(app) {
  // Get all posts
  app.get("/api/posts", checkJWT, function(req, res) {
    db.Post.findAll({
      include: [{ model: db.User, as: "User", attributes: ["username"] }]
    }).then(function(dbPosts) {
      // console.log(dbPosts);

      res.json(dbPosts);
    });
  });

  // Create a new user
  app.post("/api/user", function(req, res) {
    // console.log("this is a POST/user");

    db.User.create(req.body)
      .then(function() {
        return res.send(true);
      })
      .catch(function(err) {
        console.log(err);
        res.status(406).send("Database could not validate.");
      });
  });
  //signing in api route
  app.post("/api/signin", function(req, res) {
    db.User.findOne({ where: { username: req.body.username } })
      .then(function(user) {
        // console.log(user);
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

  app.post("/api/post", function(req, res) {
    const { subject, category, body } = req.body;
    console.log(req.user);
    console.log(req.body);
    db.Post.create({
      UserId: 1,
      subject,
      category,
      body,
      saved: false
    })
      .then(function() {
        return res.send(true);
      })
      .catch(function(err) {
        console.log(err);
        res.status(406).send("Database could not validate.");
      });
  });

  app.use(function(err, req, res, next) {
    res.send("error handler");
  });

  //get posts from a specific category
  app.get("/api/category/:category", function(req, res) {
    db.Post.findAll({
      where: { category: req.params.category },
      include: [{ model: db.User, as: "User", attributes: ["username"] }]
    }).then(function(dbPosts) {
      // console.log(dbPosts);

      res.json(dbPosts);
    });
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
