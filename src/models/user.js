const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 20
  },
  facNumber: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 100
  },
  middleName: {
    type: String
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 30,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_@*]).*[A-Za-z\d-_@*]$/
  },
  spec: {
    type: String,
    required: true,
    maxlength: 100
  },
  study: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  token: {
    type: String
  }
});

userSchema.virtual("works", {
  ref: "Work",
  localField: "_id",
  foreignField: "student"
});

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.token

  return userObject
}

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "gennadiyfurduyproject");

  user.token = token ;
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (userName, password) => {
  const user = await User.findOne({ userName });
  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = password === user.password;
  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
