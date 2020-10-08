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
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          console.log("New comment's username will be " + req.user.username);
          //save comment
          comment.save();
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

//comment edit
router.get("/:comment_id/edit", checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id)
    .then((foundComment) => {
      res.render("comments/edit", {
        campground_id: req.params.id,
        comment: foundComment,
      });
    })
    .catch((err) => {
      res.redirect("back");
    });
});

//comment update
router.put("/:comment_id", checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment)
    .then((updatedComment) => {
      res.redirect("/campgrounds/" + req.params.id);
    })
    .catch((err) => {
      res.redirect("back");
    });
});

//comment delet
router.delete("/:comment_id", checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id)
    .then((result) => {
      res.redirect("/campgrounds/" + req.params.id);
    })
    .catch((err) => {
      res.redirect("back");
    });
});

function checkCommentOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id)
      .then((foundComment) => {
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      })
      .catch((err) => {
        res.redirect("back");
      });
  } else {
    res.redirect("back");
  }
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
