const mongoose = require("mongoose");
const global = require("../../global/global");

const assetTypeModel = mongoose.model("AssetType");

exports.GetAssetType = async function () {
  const data = await assetTypeModel.find().exec();

  if (!data) {
    throw global.ErrorDataNotFound("Asset Type list not found");
  }

  return data;
};

exports.GetAssetTypeById = async function (assetTypeId) {
  if (!assetTypeId) {
    throw global.ErrorBadRequest("Asset Type id not found");
  }

  const data = await assetTypeModel.findById(assetTypeId).exec();

  if (!data) {
    throw global.ErrorDataNotFound("Asset Type not found");
  }

  return data;
};

exports.InsertAssetType = async function (params) {
  if (!params.name) {
    return global.ErrorBadRequest("Name not found");
  }

  const assetTypeData = new assetTypeModel({
    ...params,
  });

  await assetTypeData.save();
  return assetTypeData;
};

exports.UpdateAssetType = async function (params) {
  if (!params.assetTypeId) {
    return global.ErrorBadRequest("Asset Type id not found");
  }
  if (!params.name) {
    return global.ErrorBadRequest("Name not found");
  }

  const data = await assetTypeModel.updateOne(
    {
      _id: params.assetTypeId,
    },
    {
      $set: {
        ...params,
      },
    }
  );

  return data;
};

exports.DeleteAssetType = async function (assetTypeId) {
  if (!assetTypeId) {
    return global.ErrorBadRequest("Asset type id not found");
  }

  const data = await assetTypeModel.deleteOne({ _id: assetTypeId }).exec();
  return data;
};
