const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { Faculty } = require("../models/facultyModel");
const { Student } = require("../models/studentModel");
const { Linkss } = require("../models/lisks");
const { Token } = require("../models/token");
const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const multer = require("multer");
const router = express.Router();

router.post("/addlink", (req, res) => {
  link = new Linkss({
    email: req.body.email,
    programId: req.body.programId,
    link: req.body.url,
  });

  link.save();
  res.send("complete");
});

router.post("/getLink", async (req, res) => {
  await Linkss.find({ programId: req.body.programId })
    .sort({ createdAt: -1 })
    .limit(1)
    .then((result) => {
      res.send(result);
    });
});

router.post("/getAllLink", async (req, res) => {
  await Linkss.find({ programId: req.body.id }).then((result) => {
    console.log("hello , ", result);
    res.send(result);
  });
});

router.post("/delLink", async (req, res) => {
  await Linkss.find({ _id: req.body.id })
    .sort({ createdAt: -1 })
    .remove()
    .then((result) => {
      res.send(result);
    });
});

module.exports = router;
