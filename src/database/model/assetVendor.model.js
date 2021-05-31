const mongoose = require("mongoose");
const DepreciationSchema = require("../model/depreciation.model").Schema;

const assetVendorSchema = new mongoose.Schema({
  asset: {
    type: String,
    required: true,
    ref: "Asset",
  },
  vendor: {
    type: String,
    required: false,
    ref: "Vendor",
  },
  depreciation: {
    type: DepreciationSchema,
    required: false,
    default: null,
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
  isArchived: {
    type: Boolean,
    required: true,
    default: false,
  },
});

exports.Schema = assetVendorSchema;
exports.Model = mongoose.model("AssetVendor", assetVendorSchema, "assetvendor");
