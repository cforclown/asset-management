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
    if (!req.params.assetId) {
      return res.status(400).send("Asset id not found");
    }

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
    if (!req.body.params) {
      return res.status(400).send("Asset parameter not found");
    }
    if (!req.body.params.name) {
      return res.status(400).send("Name not found");
    }

    const data = await assetController.InsertAsset(req.body.params);

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

Router.put("/", async (req, res) => {
  try {
    if (!req.body.params) {
      return res.status(400).send("Asset parameter not found");
    }
    if (!req.body.params.assetId) {
      return res.status(400).send("Asset id not found");
    }
    if (!req.body.params.name) {
      return res.status(400).send("Name not found");
    }

    const data = await assetController.UpdateAsset(req.body.params);

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

Router.delete("/:assetId", async (req, res) => {
  try {
    if (!req.params.assetId) {
      return res.status(400).send("Asset id not found");
    }

    const data = await assetController.DeleteAsset(req.params.assetId);

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

/**
 * @swagger
 * /api/asset:
 *      get:
 *          tags:
 *              - Asset
 *          description: Get Asset List
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *      post:
 *          tags:
 *              - Asset
 *          description: Create Asset
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          requestBody:
 *              description: "Asset data"
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/assetData'
 *      put:
 *          tags:
 *              - Asset
 *          description: Update Asset
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          requestBody:
 *              description: "Asset data"
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/editAssetData'
 * /api/asset/{assetId}}:
 *      get:
 *          tags:
 *              - Asset
 *          description: Get Asset By Asset Id
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          parameters:
 *          -   name: assetId
 *              in: path
 *              required: true
 *      delete:
 *          tags:
 *              - Asset
 *          description: Delete Asset By Asset Id
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          parameters:
 *          -   name: assetId
 *              in: path
 *              required: true
 */
