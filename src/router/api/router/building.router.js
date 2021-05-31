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

    const data = await buildingController.InsertBuilding(req.body);

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

    const data = await buildingController.UpdateBuilding(req.body);

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

    const data = await buildingController.DeleteAssetVendor(
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

module.exports = Router;
