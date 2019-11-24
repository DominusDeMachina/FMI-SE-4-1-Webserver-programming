const express = require("express");
const Study = require("../models/study");
const router = new express.Router();

router.get("/api/study", async (req, res) => {
  try {
    const studies = await Study.find({});
    res.send(studies);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
