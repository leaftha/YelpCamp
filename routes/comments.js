const express = require("express"),
  router = express.Router({ mergeParams: true }),
  Campground = require("../models/campground"),
  Comment = require("../models/comment");

router.get("/new", isLoggedIn, (req, res) => {
  //find campground
  Campground.findById(req.params.id)
    .then((campground) => {
      res.render("comments/new", { campground: campground });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", (req, res) => {
  Campground.findById(req.params.id)
    .then((campground) => {
      console.log(req.body.comment);
      Comment.create(req.body.comment)
        .then((comment) => {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/campgrounds");
    });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
