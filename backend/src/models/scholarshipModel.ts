import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  criteria: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

export const scholarshipModel = mongoose.model(
  "scholarship",
  scholarshipSchema
);
