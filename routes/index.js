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
        res.redirect("/campgrounds");
      });
    })
    .catch((err) => {
      console.log(err);
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
  res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
