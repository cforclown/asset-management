const mongoose = require("mongoose");
const global = require("../../global/global");

const assetSuperTypeModel = mongoose.model("AssetSuperType");

exports.GetAssetSuperType = async function () {
  const data = await assetSuperTypeModel.find().exec();

  if (!data) {
    throw global.ErrorBadRequest("Asset Super Type list not found");
  }

  return data;
};

exports.GetAssetSuperTypeById = async function (assetSuperTypeId) {
  if (!assetSuperTypeId) {
    throw global.ErrorBadRequest("Asset super type id not found");
  }

  const data = await assetSuperTypeModel.findById(assetSuperTypeId).exec();

  if (!data) {
    throw global.ErrorDataNotFound("Asset super type not found");
  }

  return data;
};

exports.InsertAssetSuperType = async function (params) {
  if (!params.name) {
    return global.ErrorBadRequest("Name not found");
  }

  const assetSuperTypeData = new assetSuperTypeModel({
    ...params,
  });

  await assetSuperTypeData.save();
  return assetSuperTypeData;
};

exports.UpdateAssetSuperType = async function (params) {
  if (!params._id) {
    return global.ErrorBadRequest("Asset Super Type id not found");
  }
  if (!params.name) {
    return global.ErrorBadRequest("Name not found");
  }

  const data = await assetSuperTypeModel.updateOne(
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

exports.DeleteVendor = async function (assetSuperTypeId) {
  if (!assetSuperTypeId) {
    return global.ErrorBadRequest("Asset Super Type id not found");
  }

  const data = await assetSuperTypeModel
    .deleteOne({ _id: assetSuperTypeId })
    .exec();
  return data;
};
