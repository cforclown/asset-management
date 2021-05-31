const mongoose = require("mongoose");

const depreciationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: null,
  },
  duration: {
    type: Number,
    required: false,
    default: null,
  },
  manufactureDate: {
    type: Date,
    required: false,
    default: null,
  },
  disposeDate: {
    type: Date,
    required: false,
    default: null,
  },
});

exports.Schema = depreciationSchema;
exports.Model = mongoose.model(
  "Depreciation",
  depreciationSchema,
  "depreciation"
);
