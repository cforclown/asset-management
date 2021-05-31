const mongoose = require("mongoose");
const global = require("../../global/global");

const assetModel = mongoose.model("Asset");

exports.GetAsset = async function () {
  const data = await assetModel.find().exec();

  if (!data) {
    throw global.ErrorDataNotFound("Asset list not found");
  }

  return data;
};

exports.GetAssetById = async function (assetId) {
  if (!assetId) {
    throw global.ErrorBadRequest("Asset id not found");
  }

  const data = await assetModel.findById(assetId).exec();

  if (!data) {
    throw global.ErrorDataNotFound("Asset not found");
  }

  return data;
};

exports.InsertAsset = async function (params) {
  if (!params.name) {
    return global.ErrorBadRequest("Name not found");
  }

  const assetData = new assetModel({
    ...params,
  });

  await assetData.save();
  return assetData;
};

exports.UpdateAsset = async function (params) {
  if (!params._id) {
    return global.ErrorBadRequest("Asset id not found");
  }
  if (!params.name) {
    return global.ErrorBadRequest("Name not found");
  }

  const data = await assetModel.updateOne(
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

exports.DeleteAsset = async function (assetId) {
  if (!assetId) {
    return global.ErrorBadRequest("Asset id not found");
  }

  const data = await assetModel.deleteOne({ _id: assetId }).exec();
  return data;
};
