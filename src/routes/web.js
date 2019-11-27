const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();


router.get("/", (req, res) => {
  if (req.cookies.token) res.redirect("/works");
  res.render("login", {
    title: "Вход"
  });
});

router.get("/register", async (req, res) => {
  if (req.cookies.token) res.redirect("/works");
  res.render("register", {
    title: "Регистрация",
  });
});

router.get("/works", auth, async (req, res) => {
  await req.user.populate("works").execPopulate();
  res.render("works", {
    title: "Курсови работи",
    works: req.user.works || []
  });
});

router.get("/works/new", auth, (req, res) => {
  res.render("new_work", {
    title: "Нова курсова работа"
  });
});

module.exports = router;
