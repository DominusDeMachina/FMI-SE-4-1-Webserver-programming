const express = require("express");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");
require("./db/dbhelper");
require("./db/dbpopulate");
const userRouter = require("./routes/user");
const workRouter = require("./routes/work");
const studyRouter = require("./routes/study");
const courseRouter = require("./routes/course");
const webRouter = require("./routes/web");

const app = express();
const port = process.env.port || 3000;

const partialPath = path.join(__dirname, "../views/partials");
const publicPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
hbs.registerPartials(partialPath);

app.use(express.static(publicPath));

app.use(express.json());
app.use(cookieParser());
app.use(webRouter);
app.use(userRouter);
app.use(workRouter);
app.use(studyRouter);
app.use(courseRouter);

app.use(function(req, res, next) {
  res.redirect("/")
});

app.listen(port, () => {
  console.log("Server start on port ", port);
});
