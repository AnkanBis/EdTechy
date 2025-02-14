import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
});

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  programs: {
    type: [programSchema],
    required: true,
  },
});

export const universityModel = mongoose.model("university", universitySchema);
export const programModel = mongoose.model("program", programSchema);
