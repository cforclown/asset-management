const express = require("express");
const global = require("../../../global/global");
const employeeController = require("../../../database/controller/employee.controller");

const Router = express.Router();

Router.get("/", async (req, res) => {
  try {
    const data = await employeeController.GetEmployee();

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Employee List not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

Router.get("/:employeeId", async (req, res) => {
  try {
    if (!req.params.employeeId) {
      return res.status(400).send("Employee id not found");
    }

    const data = await employeeController.GetEmployeeById(
      req.params.employeeId
    );

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Employee not found"));
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
      return res.status(400).send("Employee parameter not found");
    }
    if (!req.body.params.fullname) {
      return res.status(400).send("Fullname not found");
    }

    const data = await employeeController.InsertEmployee(req.body.params);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Employee not found"));
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
      return res.status(400).send("Employee parameter not found");
    }
    if (!req.body.params.employeeId) {
      return res.status(400).send("Employee id not found");
    }
    if (!req.body.params.fullname) {
      return res.status(400).send("Fullname not found");
    }

    const data = await employeeController.UpdateEmployee(req.body.params);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Employee not found"));
    }

    res.send(global.Response(data));
  } catch (err) {
    global.DumpError(err);
    res.status(500).send(global.Response(null, err.message));
  }
});

Router.delete("/:employeeId", async (req, res) => {
  try {
    if (!req.params.employeeId) {
      return res.status(400).send("Employee id not found");
    }

    const data = await employeeController.DeleteEmployee(req.params.employeeId);

    if (!data) {
      return res.send
        .status(404)
        .send(global.Response(null, "Employee not found"));
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
 * /api/employee:
 *      get:
 *          tags:
 *              - Employee
 *          description: Get Employee List
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *      post:
 *          tags:
 *              - Employee
 *          description: Create Employee
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          requestBody:
 *              description: "Employee data"
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/employeeData'
 *      put:
 *          tags:
 *              - Employee
 *          description: Update Employee
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          requestBody:
 *              description: "Employee data"
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/editEmployeeData'
 * /api/employee/{employeeId}}:
 *      get:
 *          tags:
 *              - Employee
 *          description: Get Employee By Employee Id
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          parameters:
 *          -   name: employeeId
 *              in: path
 *              required: true
 *      delete:
 *          tags:
 *              - Employee
 *          description: Delete Employee By Employee Id
 *          responses:
 *              '200':
 *                  description: OK
 *          security:
 *              - Bearer: []
 *          parameters:
 *          -   name: employeeId
 *              in: path
 *              required: true
 */
