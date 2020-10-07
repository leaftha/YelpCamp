const express = require("express"),
  router = express.Router(),
  Campground = require("../models/campground");

//index
router.get("/", (req, res) => {
  console.log(req.user);
  //from DBS
  Campground.find({})
    .then((allCampgrounds) => {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    })
    .catch((err) => {
      console.log(err);
    });
  // res.render("campgrounds", { campgrounds: campgrounds });
});

//create
router.post("/", isLoggedIn, function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username,
  };
  var newCampground = {
    name: name,
    image: image,
    description: description,
    author: author,
  };
  Campground.create(newCampground)
    .then((newDB) => {
      res.redirect("/campgrounds");
    })
    .catch((err) => {
      console.log(err);
    });
  // campgrounds.push(newCampground);
});

//new
router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new.ejs");
});

//show
router.get("/:id", (req, res) => {
  Campground.findById(req.params.id)
    .populate("comments")
    .exec()
    .then((foundCampgrounds) => {
      console.log(foundCampgrounds);
      res.render("campgrounds/show", { campground: foundCampgrounds });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Edit
router.get("/:id/edit", (req, res) => {
  Campground.findById(req.params.id)
    .then((foundCampground) => {
      res.render("campgrounds/edit", { campground: foundCampground });
    })
    .catch((err) => {
      res.redirect("/campgrounds");
    });
});

//update
router.put("/:id", (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground)
    .then((updatedCampground) => {
      res.redirect("/campgrounds/" + req.params.id);
    })
    .catch((err) => {
      res.redirect("/campgrounds");
    });
});

//distory
router.delete("/:id", (req, res) => {
  Campground.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.redirect("/campgrounds");
    })
    .catch((err) => {
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
