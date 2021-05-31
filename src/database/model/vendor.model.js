const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  accountManagerName: {
    type: String,
    required: false,
    default: null,
  },
  accountManagerPhone: {
    type: String,
    required: false,
    default: null,
  },
});

exports.Schema = vendorSchema;
exports.Model = mongoose.model("Vendor", vendorSchema, "vendor");
