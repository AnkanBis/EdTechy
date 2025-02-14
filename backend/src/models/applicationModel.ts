import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  application_status: {
    type: String,
    enum: ["Submitted", "Under Review", "Accepted", "Rejected"],
    default: "Submitted",
  },
  submission: {
    type: Date,
    default: Date.now,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
});

export const applicationModel = mongoose.model(
  "application",
  applicationSchema
);
