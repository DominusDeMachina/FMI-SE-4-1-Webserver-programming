const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 5
  },
  file: {
    type: Buffer
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Work = mongoose.model("Work", workSchema);

module.exports = Work;