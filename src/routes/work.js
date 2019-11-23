const express = require("express");
const multer = require("multer");
const Work = require("../models/work");
const auth = require("../middleware/auth");
const router = new express.Router();

router.get("/api/works", auth, async (req, res) => {
  try {
    await req.user.populate("works").execPopulate();
    res.send(req.user.works);
  } catch (error) {
    res.status(500).send();
  }
});

const upload = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(zip)$/)) {
      return cb(new Error("Please upload a zip file"));
    }
  }
});

router.post(
  "/api/works/upload",
  auth,
  upload.single("file"),
  async (req, res) => {
    const work = new Work({
      file: req.file.buffer,
      student: req.user._id,
      name: req.name
    });
    try {
      await work.save();
      res.status(201).send(work);
    } catch (e) {
      res.status(400).send(e);
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
