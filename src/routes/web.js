const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();

router.get("/", (req, res) => {
  res.render("login", {
    title: "Вход"
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Регистрация"
  });
});

module.exports = router;
