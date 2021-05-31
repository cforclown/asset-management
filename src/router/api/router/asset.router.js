const express = require("express");
const global = require("../../../global/global");
const assetController = require("../../../database/controller/asset.controller");

const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const data = await assetController.GetAsset();

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Asset List not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

Router.get("/:assetId", async (req, res) => {
  try {
    const data = await assetController.GetAssetById(req.params.assetId);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Asset not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

Router.post("/", async (req, res) => {
  try {
    const data = await assetController.InsertAsset(req.body);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Asset not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

module.exports = Router;
