const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground");

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

// Campground.create({
//   name: "Granite Hill",
//   image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//   description: "this is huge granite hills",
// })
//   .then((campground) => {
//     console.log(campground);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.get("/", (req, res) => {
  res.render("landing");
});

//index
app.get("/campgrounds", (req, res) => {
  //from DBS
  Campground.find()
    .then((allCampgrounds) => {
      res.render("index", { campgrounds: allCampgrounds });
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
  res.render("new.ejs");
});

app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id)
    .then((foundCampgrounds) => {
      res.render("show", { campground: foundCampgrounds });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log("start sever");
});
