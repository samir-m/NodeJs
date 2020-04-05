const path = require("path");
const fs = require("fs");

const express = require("express");

const rootDir = require("../utils/path");

const route = express.Router();

route.get("/", (req, res) => {
  const p = path.join(rootDir, "Public", "Data", "gallery.json");
  let photos = [];
  fs.readFile(p, (err, fileContent) => {
    if (!err) {
      photos = JSON.parse(fileContent);
    }
    res.render("dashboard", {
      photos: photos,
      title: "Dashboard",
      path: "/dashboard",
    });
  });
});

module.exports = route;
