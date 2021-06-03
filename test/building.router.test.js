process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = require("chai").expect;
const request = require("supertest");

const database = require("../src/database/database");
const server = require("../src/app");

const userModel = require("../src/database/model/user.model").Model;
const roleModel = require("../src/database/model/role.model").Model;
const global = require("../src/global/global");

const mongoose = require("mongoose");

const tempBuildingId = mongoose.Types.ObjectId();

const userAdmin = {
  username: "admin",
  password: "admin",
  email: "admin@gmail.com",
  fullname: "admin",
  role: null,
  accessToken: null,
};
const userBasic = {
  username: "basic",
  password: "basic",
  email: "basic@gmail.com",
  fullname: "basic",
  role: null,
  accessToken: null,
};
var sampleUserData = {
  username: "haha",
  password: "haha@gmail.com",
  email: "haha@gmail.com",
  fullname: "haha@gmail.com",
  role: null,
};
const sampleBuildingData = {
  _id: tempBuildingId,
  name: "IT BUILDING",
  desc: "Server, etc",
  state: "INA",
  zipCode: "225566",
  address: "BATAM",
};
const sampleEditBuildingData = {
  buildingId: tempBuildingId,
  name: "IT BUILDING - edit",
  desc: "Server, etc - edit",
  state: "INA - edit",
  zipCode: "225566 - edit",
  address: "BATAM - edit",
};

describe("TESTING /api/building", () => {
  // BEFORE TESTING
  before((done) => {
    database
      .connect()
      .then(async () => {
        // ROLE ADMIN
        const adminRoleDoc = new roleModel({
          name: "Admin",
          user: {
            view: true,
            create: true,
            update: true,
            delete: true,
          },
          masterData: {
            view: true,
            create: true,
            update: true,
            delete: true,
          },
        });
        await adminRoleDoc.save();

        // ROLE BASIC
        const basicRoleDoc = new roleModel({
          name: "Basic",
          user: {
            view: true,
            create: false,
            update: false,
            delete: false,
          },
          masterData: {
            view: false,
            create: false,
            update: false,
            delete: false,
          },
        });
        await basicRoleDoc.save();

        // USER ADMIN
        userAdmin.role = adminRoleDoc._id;
        const userAdminDoc = new userModel({
          ...userAdmin,
          password: await global.Hash(userAdmin.password),
        });
        await userAdminDoc.save();

        // USER BASIC
        userBasic.role = basicRoleDoc._id;
        const userBasicDoc = new userModel({
          ...userBasic,
          password: await global.Hash(userBasic.password),
        });
        await userBasicDoc.save();

        sampleUserData.role = basicRoleDoc._id;

        done();
      })
      .catch((err) => done(err));
  });

  // AFTER TESTING
  after(async () => {
    try {
      await userModel.collection.drop();
      await roleModel.collection.drop();
    } catch (err) {
      global.DumpError(err, false);
      throw err;
    }
  });

  // BEFORE EVERY TEST, LOGIN BEFORE EVERY TEST
  beforeEach(async () => {
    try {
      // USER ADMIN LOGIN
      const adminLoginResponse = await request(server)
        .post("/auth/login/test")
        .send(userAdmin);
      if (
        adminLoginResponse.status !== 200 &&
        adminLoginResponse.status !== 302
      )
        throw Error("Login failed");

      expect(adminLoginResponse).to.contain.property("text");

      const adminLoginResponseBody = JSON.parse(adminLoginResponse.text);

      expect(adminLoginResponseBody).to.be.an("object");
      expect(adminLoginResponseBody).to.contain.property("data");

      const adminTokenData = adminLoginResponseBody.data;
      expect(adminTokenData).to.contain.property("accessToken");
      expect(adminTokenData).to.contain.property("refreshToken");
      expect(adminTokenData).to.contain.property("userData");

      userAdmin._id = adminTokenData.userData.userId;
      userAdmin.accessToken = adminTokenData.accessToken;

      // USER BASIC LOGIN
      const basicLoginResponse = await request(server)
        .post("/auth/login/test")
        .send(userBasic);
      if (
        basicLoginResponse.status !== 200 &&
        basicLoginResponse.status !== 302
      )
        throw Error("Login failed");

      expect(basicLoginResponse).to.contain.property("text");

      const basicLoginResponseBody = JSON.parse(basicLoginResponse.text);

      expect(basicLoginResponseBody).to.be.an("object");
      expect(basicLoginResponseBody).to.contain.property("data");

      const basicTokenData = basicLoginResponseBody.data;
      expect(basicTokenData).to.contain.property("accessToken");
      expect(basicTokenData).to.contain.property("refreshToken");
      expect(basicTokenData).to.contain.property("userData");

      userBasic._id = basicTokenData.userData.userId;
      userBasic.accessToken = basicTokenData.accessToken;
    } catch (err) {
      global.DumpError(err, false);
      throw err;
    }
  });

  // AFTER EVERY TEST
  // afterEach(done=>{
  // })

  describe("[POST]", () => {
    it("CREATE A BUIDLING", (done) => {
      request(server)
        .post("/api/building")
        .set({ Authorization: `Bearer ${userAdmin.accessToken}` })
        .send({ params: sampleBuildingData })
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response).to.contain.property("text");

          const body = JSON.parse(response.text);
          expect(body).to.be.an("object");
          expect(body).to.contain.property("data");

          const data = body.data;
          expect(data).to.be.an("object");

          done();
        });
    });
  });

  describe("[GET]", () => {
    it("GET ALL BUILDING LIST", (done) => {
      request(server)
        .get("/api/building")
        .set({ Authorization: `Bearer ${userAdmin.accessToken}` })
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response).to.contain.property("text");

          const body = JSON.parse(response.text);
          expect(body).to.be.an("object");
          expect(body).to.contain.property("data");

          const data = body.data;
          expect(data).to.be.an("array");

          done();
        });
    });

    it("GET BUILDING BY BUILDING ID", (done) => {
      request(server)
        .get("/api/building/" + tempBuildingId)
        .set({ Authorization: `Bearer ${userAdmin.accessToken}` })
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response).to.contain.property("text");

          const body = JSON.parse(response.text);
          expect(body).to.be.an("object");
          expect(body).to.contain.property("data");

          const data = body.data;
          expect(data).to.be.an("object");

          done();
        });
    });
  });

  describe("[PUT]", () => {
    it("UPDATE A BUILDING", (done) => {
      request(server)
        .put("/api/building")
        .set({ Authorization: `Bearer ${userAdmin.accessToken}` })
        .send({ params: sampleEditBuildingData })
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response).to.contain.property("text");

          const body = JSON.parse(response.text);
          expect(body).to.be.an("object");
          expect(body).to.contain.property("data");

          const data = body.data;
          expect(data).to.be.an("object");

          done();
        });
    });
  });

  describe("[DELETE]", () => {
    it("DELETE A BUILDING", (done) => {
      request(server)
        .delete("/api/building/" + tempBuildingId)
        .set({ Authorization: `Bearer ${userAdmin.accessToken}` })
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response).to.contain.property("text");

          const body = JSON.parse(response.text);
          expect(body).to.be.an("object");
          expect(body).to.contain.property("data");

          const data = body.data;
          expect(data).to.be.an("object");

          done();
        });
    });
  });
});
