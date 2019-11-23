const express = require("express");
const Study = require("../models/study");
const auth = require("../middleware/auth");
const router = new express.Router();

router.get("/api/study", auth, async (req, res) => {
  try {
    const studies = await Study.find({});
    res.send(studies);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
