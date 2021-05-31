const express = require("express");
const global = require("../../../global/global");
const assetVendorController = require("../../../database/controller/assetVendor.controller");

const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const data = await assetVendorController.GetAssetVendor();

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Asset Vendor List not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

Router.get("/:assetVendorId", async (req, res) => {
  try {
    if (!req.params.assetVendorId) {
      return res.status(400).send("Asset Vendor id not found");
    }

    const data = await assetVendorController.GetAssetVendorById(
      req.params.assetVendorId
    );

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Asset Vendor not found"));
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
      return res.status(400).send("Asset Vendor parameter not found");
    }
    if (!req.body.params.name) {
      return res.status(400).send("Name not found");
    }

    const data = await assetVendorController.InsertAssetVendor(req.body);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Asset Vendor not found"));
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
      return res.status(400).send("Asset Vendor parameter not found");
    }
    if (!req.body.params.assetVendorId) {
      return res.status(400).send("Asset Vendor id not found");
    }
    if (!req.body.params.name) {
      return res.status(400).send("Name not found");
    }

    const data = await assetVendorController.UpdateAssetVendor(req.body);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Asset Vendor not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

Router.delete("/:assetVendorId", async (req, res) => {
  try {
    if (!req.params.assetVendorId) {
      return res.status(400).send("vendor id not found");
    }

    const data = await assetVendorController.DeleteAssetVendor(
      req.params.assetVendorId
    );

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Asset Vendor not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

module.exports = Router;
