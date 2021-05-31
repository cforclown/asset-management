const mongoose = require("mongoose");
const global = require("../../global/global");

const buildingModel = mongoose.model("Building");

exports.GetBuilding = async function () {
  const data = await buildingModel.find().exec();

  if (!data) {
    throw global.ErrorDataNotFound("Building list not found");
  }

  return data;
};

exports.GetBuildingById = async function (buildingId) {
  if (!buildingId) {
    throw global.ErrorBadRequest("Building id not found");
  }

  const data = await buildingModel.findById(buildingId).exec();

  if (!data) {
    throw global.ErrorDataNotFound("Building not found");
  }

  return data;
};

exports.InsertBuilding = async function (params) {
  if (!params.name) {
    return global.ErrorBadRequest("Name not found");
  }

  const buildingData = new buildingModel({
    ...params,
  });

  await buildingData.save();
  return buildingData;
};

exports.UpdateBuilding = async function (params) {
  if (!params.buildingId) {
    return global.ErrorBadRequest("Building id not found");
  }
  if (!params.name) {
    return global.ErrorBadRequest("Name not found");
  }

  const data = await buildingModel.updateOne(
    {
      _id: params.buildingId,
    },
    {
      $set: {
        ...params,
      },
    }
  );

  return data;
};

exports.DeleteBuilding = async function (buildingId) {
  if (!buildingId) {
    return global.ErrorBadRequest("Building id not found");
  }

  const data = await buildingModel.deleteOne({ _id: buildingId }).exec();
  return data;
};
