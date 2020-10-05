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
router.post("/", function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = { name: name, image: image, description: description };
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

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
