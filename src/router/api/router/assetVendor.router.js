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

    const data = await assetVendorController.InsertAssetVendor(req.body.params);

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

    const data = await assetVendorController.UpdateAssetVendor(req.body.params);

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
      return res.status(400).send("Vendor id not found");
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

/**
 * @swagger
 * /api/assetVendor:
 *      get:
 *          tags:
 *              - Asset Vendor
 *          description: Get Asset Vendor List
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *      post:
 *          tags:
 *              - Asset Vendor
 *          description: Create Asset Vendor
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          requestBody:
 *              description: "Asset Vendor data"
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/assetVendorData'
 *      put:
 *          tags:
 *              - Asset Vendor
 *          description: Update Asset Vendor
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          requestBody:
 *              description: "Asset Vendor data"
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/editAssetVendorData'
 * /api/assetVendor/{assetVendorId}}:
 *      get:
 *          tags:
 *              - Asset Vendor
 *          description: Get Asset Vendor By Asset Vendor Id
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          parameters:
 *          -   name: assetVendorId
 *              in: path
 *              required: true
 *      delete:
 *          tags:
 *              - Asset Vendor
 *          description: Delete Asset Vendor By Asset Vendor Id
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          parameters:
 *          -   name: assetVendorId
 *              in: path
 *              required: true
 */
