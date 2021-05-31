const mongoose = require("mongoose");

const assetTypeSchema = new mongoose.Schema({
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
  assetSuperType: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "AssetSuperType",
  },
  defaultDepreciationDuration: {
    type: Number,
    required: false,
    default: null,
  },
});

exports.Schema = assetTypeSchema;
exports.Model = mongoose.model("AssetType", assetTypeSchema, "assettype");
