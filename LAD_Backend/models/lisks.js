const config = require("config");
const jwt = require("jsonwebtoken");
// const Joi = require('joi');
const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    programId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Program" }],
    link: { type: String },
  },
  { timestamps: true }
);

const linkss = mongoose.model("Links", LinkSchema);

exports.Linkss = linkss;
