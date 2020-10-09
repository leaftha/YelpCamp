const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  User = require("../models/user");

router.get("/", (req, res) => {
  res.render("landing");
});

//show register form
router.get("/register", (req, res) => {
  res.render("register");
});
// handle sign up logic
router.post("/register", (req, res) => {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password)
    .then((user) => {
      passport.authenticate("local")(req, res, () => {
        req.flash("success","Welcome to YelpCamp " + user.username)
        res.redirect("/campgrounds");
      }); 
    })
    .catch((err) => {
      req.flash("error", err.message)
      return res.render("register");
    });
});

//login
router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

//logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success" , "Logged out")
  res.redirect("/campgrounds");
});

module.exports = router;
