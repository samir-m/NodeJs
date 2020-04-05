const fs = require("fs");
const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const rootDir = require("../utils/path");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const routes = express.Router();

let category = [];

routes.get("/category", (req, res) => {
  res.render("category", { title: "Add Category", path: "/category" });
});

routes.post("/cateogry", urlencodedParser, (req, res) => {
  const p = path.join(rootDir, "public", "Data", "category.json");
  res.render("category", {
    title: "Add Category",
    path: "/category",
  });
  fs.readFile(p, (err, fileContent) => {
    if (!err) {
      category = JSON.parse(fileContent);
    }
    category.push({ category: req.body.category });
    fs.writeFile(p, JSON.stringify(category), (err) => {
      console.log(err);
    });
  });

  console.log(category);
});

module.exports = routes;
