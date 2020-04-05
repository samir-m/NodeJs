const path = require("path");

const express = require("express");

const categoryRoute = require("./routes/category");
const photoRoute = require("./routes/photo");
const dashboardRoute = require("./routes/dashboard");

const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

//app.set('views', './views');
app.use(categoryRoute);

app.use(photoRoute);

app.use(dashboardRoute);

app.listen(3000);
