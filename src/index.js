const express = require("express");
require("./db/dbhelper");
require("./db/dbpopulate");
const userRouter = require("./routes/user");
const workRouter = require("./routes/work");
const studyRouter = require("./routes/study");
const courseRouter = require("./routes/course");
const webRouter = require("./routes/web");

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(webRouter);
app.use(userRouter);
app.use(workRouter);
app.use(studyRouter);
app.use(courseRouter);

app.listen(port, () => {
  console.log("Server start on port ", port);
});
