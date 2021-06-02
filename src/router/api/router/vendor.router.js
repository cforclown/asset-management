const express = require("express");
const global = require("../../../global/global");
const vendorController = require("../../../database/controller/vendor.controller");

const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const data = await vendorController.GetVendor();

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Vendor List not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

Router.get("/:vendorId", async (req, res) => {
  try {
    if (!req.params.vendorId) {
      return res.status(400).send("Vendor id not found");
    }

    const data = await vendorController.GetVendorById(req.params.vendorId);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Vendor not found"));
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
      return res.status(400).send("Vendor parameter not found");
    }
    if (!req.body.params.name) {
      return res.status(400).send("Name not found");
    }

    const data = await vendorController.InsertVendor(req.body);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Vendor not found"));
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
      return res.status(400).send("Vendor parameter not found");
    }
    if (!req.body.params.vendorId) {
      return res.status(400).send("Vendor id not found");
    }
    if (!req.body.params.name) {
      return res.status(400).send("Name not found");
    }

    const data = await vendorController.UpdateVendor(req.body);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Vendor not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

Router.delete("/:vendorId", async (req, res) => {
  try {
    if (!req.params.vendorId) {
      return res.status(400).send("vendor id not found");
    }

    const data = await vendorController.DeleteVendor(req.params.vendorId);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Vendor not found"));
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
 * /api/vendor:
 *      get:
 *          tags:
 *              - Vendor
 *          description: Get Vendor List
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *      post:
 *          tags:
 *              - Vendor
 *          description: Create Vendor
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          requestBody:
 *              description: "Vendor data"
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/vendorData'
 *      put:
 *          tags:
 *              - Vendor
 *          description: Update Vendor
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          requestBody:
 *              description: "Vendor data"
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/vendorData'
 * /api/vendor/{vendorId}}:
 *      get:
 *          tags:
 *              - Vendor
 *          description: Get Vendor By Vendor Id
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          parameters:
 *          -   name: vendorId
 *              in: path
 *              required: true
 *      delete:
 *          tags:
 *              - Vendor
 *          description: Delete Vendor By Vendor Id
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          parameters:
 *          -   name: vendorId
 *              in: path
 *              required: true
 */
