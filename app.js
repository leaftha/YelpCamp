const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  seedDB = require("./seeds");

mongoose
  .connect("mongodb://localhost/yelp_camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Database connected`))
  .catch((err) => console.log(`Database connection error: ${err.message}`));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

app.get("/", (req, res) => {
  res.render("landing");
});

//index
app.get("/campgrounds", (req, res) => {
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
app.post("/campgrounds", function (req, res) {
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
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new.ejs");
});

//show
app.get("/campgrounds/:id", (req, res) => {
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

//=====================
//Comments routes
//=====================

app.get("/campgrounds/:id/comments/new", (req, res) => {
  //find campground
  Campground.findById(req.params.id)
    .then((campground) => {
      res.render("comments/new", { campground: campground });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/campgrounds/:id/comments", (req, res) => {
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

app.listen(3000, () => {
  console.log("start sever");
});
