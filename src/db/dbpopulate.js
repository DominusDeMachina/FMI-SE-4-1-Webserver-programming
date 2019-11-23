const Course = require("../models/course");
const Study = require("../models/study")

Course.deleteMany({}, function(err) {
  new Error("Can not remove all from courses");
});

Course.insertMany(
  [
    { name: "1 курс" },
    { name: "2 курс" },
    { name: "3 курс" },
    { name: "4 курс" }
  ],
  function(err) {
    new Error("Can not create courses object");
  }
);

Study.deleteMany({}, function(err) {
  new Error("Can not remove all from study");
});

Study.insertMany(
  [
    { name: "редовно" },
    { name: "задочно" }
  ],
  function(err) {
    new Error("Can not create courses object");
  }
);