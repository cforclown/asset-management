const mongoose = require("mongoose");
const global = require("../../global/global");

const vendorModel = mongoose.model("Vendor");

exports.GetVendor = async function () {
  const data = await vendorModel.find().exec();

  if (!data) {
    throw global.ErrorDataNotFound("Vendor list not found");
  }

  return data;
};

exports.GetVendorById = async function (vendorId) {
  if (!vendorId) {
    throw global.ErrorBadRequest("Vendor id not found");
  }

  const data = await vendorModel.findById(vendorId).exec();

  if (!data) {
    throw global.ErrorDataNotFound("Vendor not found");
  }

  return data;
};

exports.InsertVendor = async function (params) {
  if (!params.name) {
    return global.ErrorBadRequest("Name not found");
  }

  const vendorData = new vendorModel({
    ...params,
  });

  await vendorData.save();
  return vendorData;
};

exports.UpdateVendor = async function (params) {
  if (!params.vendorId) {
    return global.ErrorBadRequest("Vendor id not found");
  }
  if (!params.name) {
    return global.ErrorBadRequest("Name not found");
  }

  const data = await vendorModel.updateOne(
    {
      _id: params.vendorId,
    },
    {
      $set: {
        ...params,
      },
    }
  );

  return data;
};

exports.DeleteVendor = async function (vendorId) {
  if (!vendorId) {
    return global.ErrorBadRequest("Vendor id not found");
  }

  const data = await vendorModel.deleteOne({ _id: vendorId }).exec();
  return data;
};
