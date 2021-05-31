const express = require("express");
const global = require("../../../global/global");
const assetTypeController = require("../../../database/controller/assetType.controller");

const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const data = await assetTypeController.GetAssetType();

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Asset Type List not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

Router.get("/:assetTypeId", async (req, res) => {
  try {
    if (!req.params.assetTypeId) {
      return res.status(400).send("Asset type id not found");
    }

    const data = await assetTypeController.GetAssetTypeById(
      req.params.assetTypeId
    );

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Asset Type not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

Router.post("/", async (req, res) => {
  try {
    if (!req.body.params) {
      return res.status(400).send("Asset Type parameter not found");
    }
    if (!req.body.params.name) {
      return res.status(400).send("Name not found");
    }

    const data = await assetTypeController.InsertAssetType(req.body);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Asset Type not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

Router.put("/", async (req, res) => {
  try {
    if (!req.body.params) {
      return res.status(400).send("Asset Type parameter not found");
    }
    if (!req.body.params.assetTypeId) {
      return res.status(400).send("Asset Type id not found");
    }
    if (!req.body.params.name) {
      return res.status(400).send("Name not found");
    }

    const data = await assetTypeController.UpdateAssetType(req.body);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Asset type not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

Router.delete("/:assetTypeId", async (req, res) => {
  try {
    if (!req.params.assetTypeId) {
      return res.status(400).send("Asset type id not found");
    }

    const data = await assetTypeController.DeleteAsset(req.params.assetTypeId);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Asset Type not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

module.exports = Router;
