const mongoose = require("mongoose");

const marksSchema = mongoose.Schema(
  {
    assignId: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
    stdId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    marksobtain: {
      type: String,
      required: true,
      trim: true,
    },
    prcentage: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Marks = mongoose.model("Marks", marksSchema);

module.exports = Marks;
