const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: null,
  },
  desc: {
    type: String,
    required: false,
    default: null,
  },
  building: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Building",
  },
});

exports.Schema = locationSchema;
exports.Model = mongoose.model("Location", locationSchema, "location");
