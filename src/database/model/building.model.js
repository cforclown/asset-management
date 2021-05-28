const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema({
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
  city: {
    type: String,
    required: false,
    default: null,
  },
  state: {
    type: String,
    required: false,
    default: null,
  },
  zipCode: {
    type: String,
    required: false,
    default: null,
  },
  address: {
    type: String,
    required: false,
    default: null,
  },
});

exports.Schema = buildingSchema;
exports.Model = mongoose.model("Building", buildingSchema, "building");
