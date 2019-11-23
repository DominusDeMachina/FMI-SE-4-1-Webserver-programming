const mongoose = require("mongoose");

const studySchema = mongoose.Schema({
  name: {
    type: String,
    enum: ["редовно", "задочно"]
  }
});

const Study = new mongoose.model("Study", studySchema);

module.exports = Study;