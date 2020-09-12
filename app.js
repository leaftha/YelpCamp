const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//Schema
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//   name: "Granite Hill",
//   image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
// })
//   .then((campground) => {
//     console.log(campground);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

var campgrounds = [
  {
    name: "Salmon Creek",
    image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
  },
  {
    name: "Granite Hill",
    image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
  },
  {
    name: "Mountain Goat's Rest",
    image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg",
  },
  {
    name: "Salmon Creek",
    image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
  },
  {
    name: "Granite Hill",
    image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
  },
  {
    name: "Mountain Goat's Rest",
    image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg",
  },
  {
    name: "Salmon Creek",
    image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
  },
  {
    name: "Granite Hill",
    image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
  },
  {
    name: "Mountain Goat's Rest",
    image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg",
  },
];

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  //from DBS
  Campground.find({})
    .then((allCampgrounds) => {
      res.render("campgrounds", { campgrounds: allCampgrounds });
    })
    .catch((err) => {
      console.log(err);
    });
  // res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = { name: name, image: image };
  Campground.create(newCampground)
    .then((newDB) => {
      res.redirect("/campgrounds");
    })
    .catch((err) => {
      console.log(err);
    });
  // campgrounds.push(newCampground);
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

app.listen(3000, () => {
  console.log("start sever");
});
