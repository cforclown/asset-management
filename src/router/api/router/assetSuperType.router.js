const express = require("express");
const global = require("../../../global/global");
const assetSuperTypeController = require("../../../database/controller/assetSuperType.controller");

const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const data = await assetSuperTypeController.GetAssetSuperType();

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Asset Super Type List not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

Router.get("/:assetSuperTypeId", async (req, res) => {
  try {
    if (!req.params.assetSuperTypeId) {
      return res.status(400).send("Asset super type id not found");
    }

    const data = await assetSuperTypeController.GetAssetSuperTypeById(
      req.params.assetSuperTypeId
    );

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Asset Super Type not found"));
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
      return res.status(400).send("Asset Super Type parameter not found");
    }
    if (!req.body.params.name) {
      return res.status(400).send("Name not found");
    }

    const data = await assetSuperTypeController.InsertAssetSuperType(req.body);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Asset Super Type not found"));
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
      return res.status(400).send("Asset Super Type parameter not found");
    }
    if (!req.body.params._id) {
      return res.status(400).send("Asset Super Type id not found");
    }
    if (!req.body.params.name) {
      return res.status(400).send("Name not found");
    }

    const data = await assetSuperTypeController.UpdateAssetSuperType(req.body);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Asset Super type not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

Router.delete("/:assetSuperTypeId", async (req, res) => {
  try {
    if (!req.params.assetSuperTypeId) {
      return res.status(400).send("Asset Super type id not found");
    }

    const data = await assetSuperTypeController.DeleteAssetSuperType(
      req.params.assetSuperTypeId
    );

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Asset Super Type not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

module.exports = Router;
