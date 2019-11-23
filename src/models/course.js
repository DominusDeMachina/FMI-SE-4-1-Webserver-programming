const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    enum: ["1 курс", "2 курс", "3 курс", "4 курс"]
  }
});

const Course = new mongoose.model("Course", courseSchema);

module.exports = Course;
