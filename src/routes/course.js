const express = require("express");
const Course = require("../models/course");
const router = new express.Router();

router.get("/api/course", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.send(courses);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;