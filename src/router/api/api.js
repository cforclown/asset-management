const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const global = require("../../global/global");

const router = express.Router();

const userRouter = require("./router/user.router");
const avatarRouter = require("./router/avatar.router");
const roleRouter = require("./router/role.router");
const assetRouter = require("./router/asset.router");
const assetSuperTypeRouter = require("./router/assetSuperType.router");
const assetTypeRouter = require("./router/assetType.router");
const assetVendorRouter = require("./router/assetVendor.router");
const buildingRouter = require("./router/building.router");
const employeeRouter = require("./router/employee.router");
const locationRouter = require("./router/location.router");
const vendorRouter = require("./router/vendor.router");

router.use(async (req, res, next) => {
  try {
    if (req.originalUrl.includes("/api/avatar/") && req.method === "GET")
      return next();
    if (req.headers["authorization"] === undefined) return res.sendStatus(401);

    const token = req.headers["authorization"].split(" ")[1];

    jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, user) => {
      // TOKEN NOT VALID
      if (err) return res.sendStatus(401);
      // ROLE USER TIDAK VALID
      if (!user.role)
        return res
          .status(403)
          .send(
            global.Response(null, "User ini tidak mempunyai attribute Role")
          );

      req.user = user;

      next();
    });
  } catch (error) {
    global.DumpError(error);
    res.status(500).send(global.Response(null, error.message));
  }
});

router.use("/user", userRouter);
router.use("/avatar", avatarRouter);
router.use("/role", roleRouter);
router.use("/asset", assetRouter);
router.use("/assetSuperType", assetSuperTypeRouter);
router.use("/assetType", assetTypeRouter);
router.use("/assetVendor", assetVendorRouter);
router.use("/building", buildingRouter);
router.use("/employee", employeeRouter);
router.use("/location", locationRouter);
router.use("/vendor", vendorRouter);

module.exports = router;
