const mongoose = require("mongoose");
const global = require("../../global/global");

const assetVendorModel = mongoose.model("AssetVendor");
const depreciationModel = mongoose.model("Depreciation");

exports.GetAssetVendor = async function () {
  const data = await assetVendorModel.find().exec();

  if (!data) {
    throw global.ErrorDataNotFound("Asset Vendor list not found");
  }

  return data;
};

exports.GetAssetVendorById = async function (assetVendorId) {
  if (!assetVendorId) {
    throw global.ErrorBadRequest("Asset Vendor id not found");
  }

  const data = await assetVendorModel.findById(assetVendorId).exec();

  if (!data) {
    throw global.ErrorDataNotFound("Asset Vendor not found");
  }

  return data;
};

exports.InsertAssetVendor = async function (params) {
  if (!params.name) {
    return global.ErrorBadRequest("Name not found");
  }

  const depreciationData = new depreciationModel({
    name: params.depreciation.name,
    duration: params.depreciation.duration,
    manufactureDate: params.depreciation.manufactureDate,
    disposeDate: params.depreciation.disposeDate,
  });

  params.depreciation = depreciationData;

  const assetVendorData = new assetVendorModel({
    ...params,
  });

  await assetVendorData.save();
  return assetVendorData;
};

exports.UpdateAssetVendor = async function (params) {
  if (!params._id) {
    return global.ErrorBadRequest("Asset Vendor id not found");
  }
  if (!params.name) {
    return global.ErrorBadRequest("Name not found");
  }

  const data = await assetVendorModel.updateOne(
    {
      _id: params._id,
    },
    {
      $set: {
        ...params,
      },
    }
  );

  return data;
};

exports.DeleteAssetVendor = async function (assetVendorId) {
  if (!assetVendorId) {
    return global.ErrorBadRequest("Asset Vendor id not found");
  }

  const data = await assetVendorModel.deleteOne({ _id: assetVendorId }).exec();
  return data;
};
