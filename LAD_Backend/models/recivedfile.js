const mongoose = require("mongoose");

const ReciveFileSchema = mongoose.Schema(
  {
    programId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Program" }],
    email: {
      type: String,
      required: true,
      trim: true,
    },
    studentId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    assignId: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
    file_path: {
      type: String,
      required: true,
    },
    file_mimetype: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ReciveFile = mongoose.model("ReciveFile", ReciveFileSchema);

module.exports = ReciveFile;
