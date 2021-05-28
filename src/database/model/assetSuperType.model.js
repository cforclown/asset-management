const mongoose = require("mongoose");

const assetSuperTypeSchema = new mongoose.Schema({
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
});

exports.Schema = assetSuperTypeSchema;
exports.Model = mongoose.model(
  "AssetSuperType",
  assetSuperTypeSchema,
  "assetsupertype"
);
