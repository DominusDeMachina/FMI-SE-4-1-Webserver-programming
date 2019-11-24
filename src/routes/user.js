const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/api/users/register", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).cookie("token", token).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/api/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.userName,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.cookie("token", token).send({ user, token });
  } catch (e) {
    res.status(403).send();
  }
});

router.post("/api/users/logout", auth, async (req, res) => {
  try {
    req.user.token = undefined;
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
