const mongoose = require("mongoose");
const global = require("../../global/global");

const employeeModel = mongoose.model("Employee");

exports.GetEmployee = async function () {
  const data = await employeeModel.find().exec();

  if (!data) {
    throw global.ErrorDataNotFound("Employee list not found");
  }

  return data;
};

exports.GetEmployeeById = async function (employeeId) {
  if (!employeeId) {
    throw global.ErrorBadRequest("Employee id not found");
  }

  const data = await employeeModel.findById(employeeId).exec();

  if (!data) {
    throw global.ErrorDataNotFound("Employee not found");
  }

  return data;
};

exports.InsertEmployee = async function (params) {
  if (!params.name) {
    return global.ErrorBadRequest("Name not found");
  }

  const employeeData = new employeeModel({
    ...params,
  });

  await employeeData.save();
  return employeeData;
};

exports.UpdateEmployee = async function (params) {
  if (!params.employeeId) {
    return global.ErrorBadRequest("Employee id not found");
  }
  if (!params.name) {
    return global.ErrorBadRequest("Name not found");
  }

  const data = await employeeModel.updateOne(
    {
      _id: params.employeeId,
    },
    {
      $set: {
        ...params,
      },
    }
  );

  return data;
};

exports.DeleteEmployee = async function (employeeId) {
  if (!employeeId) {
    return global.ErrorBadRequest("Employee id not found");
  }

  const data = await employeeModel.deleteOne({ _id: employeeId }).exec();
  return data;
};
