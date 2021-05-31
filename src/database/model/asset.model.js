const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: null,
  },
  brandName: {
    type: String,
    required: false,
    default: null,
  },
  modelNumber: {
    type: String,
    required: false,
    default: null,
  },
  desc: {
    type: String,
    required: false,
    default: null,
  },
  assetType: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Location",
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    required: false,
    default: null,
  },
  updatedBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  updatedAt: {
    type: Date,
    required: false,
    default: null,
  },
  deletedBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  deletedAt: {
    type: Date,
    required: false,
    default: null,
  },
});

exports.Schema = assetSchema;
exports.Model = mongoose.model("Asset", assetSchema, "asset");
