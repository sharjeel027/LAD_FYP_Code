const mongoose = require("mongoose");

//simple schema
const FeedbackSchema = new mongoose.Schema(
  {
    programId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Program" }],
    faculityID: [{ type: mongoose.Schema.Types.ObjectId, ref: "Faculty" }],
    description: {
      type: String,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("FeedBack", FeedbackSchema);

exports.Feedbackss = Feedback;
