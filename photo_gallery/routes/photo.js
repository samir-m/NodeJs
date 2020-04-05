const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const routes = express.Router();

const rootDir = require("../utils/path");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

let photos = [];
let category = [];

routes.get("/addPhoto", (req, res) => {
  const p = path.join(rootDir, "Public", "Data", "category.json");
  fs.readFile(p, (err, fileContent) => {
    if (!err) {
      category = JSON.parse(fileContent);
    }
    res.render("add_photo", {
      category: category,
      title: "Add Photo",
      path: "/addPhoto",
    });
  });
});

routes.post("/addPhoto", urlencodedParser, (req, res) => {
  res.render("add_photo", {
    category: category,
    title: "Add Photo",
    path: "/addPhoto",
  });
  console.log(photos);

  const p = path.join(rootDir, "Public", "Data", "gallery.json");

  fs.readFile(p, (err, fileContent) => {
    if (!err) {
      photos = JSON.parse(fileContent);
    }
    photos.push({
      category: req.body.category,
      title: req.body.title,
      url: req.body.photo,
    });
    fs.writeFile(p, JSON.stringify(photos), (err) => {
      console.log(err);
    });
  });
});

module.exports = routes;
