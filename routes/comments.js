const express = require("express"),
  router = express.Router({ mergeParams: true }),
  Campground = require("../models/campground"),
  Comment = require("../models/comment"),
  middleware = require("../middleware");


router.get("/new", middleware.isLoggedIn, (req, res) => {
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
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
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
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment)
    .then((updatedComment) => {
      res.redirect("/campgrounds/" + req.params.id);
    })
    .catch((err) => {
      res.redirect("back");
    });
});

//comment delet
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id)
    .then((result) => {
      res.redirect("/campgrounds/" + req.params.id);
    })
    .catch((err) => {
      res.redirect("back");
    });
});

module.exports = router;
