const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var campgrounds = [
  {
    name: "Salmon Creek",
    image:
      "https://previews.123rf.com/images/welcomia/welcomia1510/welcomia151000065/47332686-%EC%88%B2%EC%97%90%EC%84%9C-%EC%BA%A0%ED%95%91-%EC%BA%A0%ED%94%84-%EC%82%AC%EC%9D%B4%ED%8A%B8%EC%97%90-%EB%8A%A6%EC%9D%80-%EC%A0%80%EB%85%81-%EA%B0%80%EB%AC%B8%EB%B9%84-%EB%82%98%EB%AC%B4-%EC%82%AC%EC%9D%B4-%EB%85%B9%EC%83%89-%EC%A1%B0%EB%AA%85-%ED%85%90%ED%8A%B8-%EC%95%84%EC%9B%83-%EB%8F%84%EC%96%B4-%EB%9D%BC%EC%9D%B4%ED%94%84-%EC%8A%A4%ED%83%80%EC%9D%BC-.jpg",
  },
  {
    name: "Granite Hill",
    image:
      "https://previews.123rf.com/images/serrnovik/serrnovik1510/serrnovik151000251/47252276-%EC%88%B2%EC%97%90%EC%84%9C-%EC%95%84%EB%A6%84-%EB%8B%A4%EC%9A%B4-%ED%99%94%EC%B0%BD%ED%95%9C-%EB%82%A0-%EB%8F%99%EC%95%88-%ED%85%90%ED%8A%B8-%EB%B0%B0%EB%82%AD-%EB%B0%8F-%EA%B8%B0%ED%83%80-%EC%9E%A5%EB%B9%84%EC%99%80-%EC%95%84%EB%A6%84-%EB%8B%A4%EC%9A%B4-%EC%BA%A0%ED%94%84%EC%9E%A5.jpg",
  },
  {
    name: "Mountain Goat's Rest",
    image:
      "https://previews.123rf.com/images/luckybusiness/luckybusiness1703/luckybusiness170300203/73427245-%ED%9C%B4%EA%B0%80%EC%97%90-%EA%B0%80%EC%A1%B1-%ED%85%8C%EC%9D%B4%EB%B8%94-%EC%BA%A0%ED%95%91.jpg",
  },
];

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = { name: name, image: image };
  campgrounds.push(newCampground);
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

app.listen(3000, () => {
  console.log("start sever");
});
