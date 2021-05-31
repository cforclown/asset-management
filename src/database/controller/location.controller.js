const mongoose = require("mongoose");
const global = require("../../global/global");

const locationModel = mongoose.model("Location");

exports.GetLocation = async function () {
  const data = await locationModel.find().exec();

  if (!data) {
    throw global.ErrorDataNotFound("Location list not found");
  }

  return data;
};

exports.GetLocationById = async function (locationId) {
  if (!locationId) {
    throw global.ErrorBadRequest("Location id not found");
  }

  const data = await locationModel.findById(locationId).exec();

  if (!data) {
    throw global.ErrorDataNotFound("Location not found");
  }

  return data;
};

exports.InsertLocation = async function (params) {
  if (!params.name) {
    return global.ErrorBadRequest("Name not found");
  }

  const locationData = new locationModel({
    ...params,
  });

  await locationData.save();
  return locationData;
};

exports.UpdateLocation = async function (params) {
  if (!params._id) {
    return global.ErrorBadRequest("Location id not found");
  }
  if (!params.name) {
    return global.ErrorBadRequest("Name not found");
  }

  const data = await locationModel.updateOne(
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

exports.DeleteLocation = async function (locationId) {
  if (!locationId) {
    return global.ErrorBadRequest("Location id not found");
  }

  const data = await locationModel.deleteOne({ _id: locationId }).exec();
  return data;
};
