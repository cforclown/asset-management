const express = require("express");
const global = require("../../../global/global");
const buildingController = require("../../../database/controller/building.controller");

const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const data = await buildingController.GetBuilding();

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Building List not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

Router.get("/:buildingId", async (req, res) => {
  try {
    if (!req.params.buildingId) {
      return res.status(400).send("Building id not found");
    }

    const data = await buildingController.GetBuildingById(
      req.params.buildingId
    );

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Building not found"));
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
      return res.status(400).send("Building parameter not found");
    }
    if (!req.body.params.name) {
      return res.status(400).send("Name not found");
    }

    const data = await buildingController.InsertBuilding(req.body.params);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Building not found"));
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
      return res.status(400).send("Building parameter not found");
    }
    if (!req.body.params.buildingId) {
      return res.status(400).send("Building id not found");
    }
    if (!req.body.params.name) {
      return res.status(400).send("Name not found");
    }

    const data = await buildingController.UpdateBuilding(req.body.params);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Building not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

Router.delete("/:buildingId", async (req, res) => {
  try {
    if (!req.params.buildingId) {
      return res.status(400).send("Building id not found");
    }

    const data = await buildingController.DeleteBuilding(req.params.buildingId);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Building not found"));
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
 * /api/building:
 *      get:
 *          tags:
 *              - Building
 *          description: Get Building List
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *      post:
 *          tags:
 *              - Building
 *          description: Create Building
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          requestBody:
 *              description: "Building data"
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/buildingData'
 *      put:
 *          tags:
 *              - Building
 *          description: Update Building
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          requestBody:
 *              description: "Building data"
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/editBuildingData'
 * /api/building/{buildingId}}:
 *      get:
 *          tags:
 *              - Building
 *          description: Get Building By Building Id
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          parameters:
 *          -   name: buildingId
 *              in: path
 *              required: true
 *      delete:
 *          tags:
 *              - Building
 *          description: Delete Building By Building Id
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          parameters:
 *          -   name: buildingId
 *              in: path
 *              required: true
 */
