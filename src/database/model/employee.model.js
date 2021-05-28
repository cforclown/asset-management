const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    default: null,
  },
  location: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: "Location",
  },
});

exports.Schema = employeeSchema;
exports.Model = mongoose.model("Employee", employeeSchema, "employee");
