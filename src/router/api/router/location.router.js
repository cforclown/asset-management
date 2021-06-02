const express = require("express");
const global = require("../../../global/global");
const locationController = require("../../../database/controller/location.controller");

const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const data = await locationController.GetLocation();

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Location List not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

Router.get("/:locationId", async (req, res) => {
  try {
    if (!req.params.locationId) {
      return res.status(400).send("Location id not found");
    }

    const data = await locationController.GetLocationById(
      req.params.locationId
    );

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Location not found"));
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
      return res.status(400).send("Location parameter not found");
    }
    if (!req.body.params.name) {
      return res.status(400).send("Name not found");
    }

    const data = await locationController.InsertLocation(req.body.params);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Location not found"));
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
      return res.status(400).send("Location parameter not found");
    }
    if (!req.body.params.locationId) {
      return res.status(400).send("Location id not found");
    }
    if (!req.body.params.name) {
      return res.status(400).send("Name not found");
    }

    const data = await locationController.UpdateLocation(req.body.params);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Location not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

Router.delete("/:locationId", async (req, res) => {
  try {
    if (!req.params.locationId) {
      return res.status(400).send("Location id not found");
    }

    const data = await locationController.DeleteLocation(req.params.locationId);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Location not found"));
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
 * /api/location:
 *      get:
 *          tags:
 *              - Location
 *          description: Get Location List
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *      post:
 *          tags:
 *              - Location
 *          description: Create Location
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          requestBody:
 *              description: "Location data"
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/locationData'
 *      put:
 *          tags:
 *              - Location
 *          description: Update Location
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          requestBody:
 *              description: "Location data"
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/editLocationData'
 * /api/location/{locationId}}:
 *      get:
 *          tags:
 *              - Location
 *          description: Get Location By Location Id
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          parameters:
 *          -   name: locationId
 *              in: path
 *              required: true
 *      delete:
 *          tags:
 *              - Location
 *          description: Delete Location By Location Id
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          parameters:
 *          -   name: locationId
 *              in: path
 *              required: true
 */
