const config = require("../config");
const mongoose = require("mongoose");

async function connect() {
  const dburl = `mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;
  const options = {
    auth: { authSource: "admin" },
    user: config.DB_USERNAME,
    pass: config.DB_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  if (config.NODE_ENV === "test") {
    const Mockgoose = require("mockgoose").Mockgoose;
    const mockgoose = new Mockgoose(mongoose);

    await mockgoose.prepareStorage();

    await mongoose.connect(dburl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  } else await mongoose.connect(dburl, options);

  registerModels();
}
function close() {
  return mongoose.disconnect();
}
function registerModels() {
  require("./model/user.model").Model;
  require("./model/role.model").Model;
  require("./model/avatar.model").Model;
  require("./model/token.model").Model;
  require("./model/asset.model").Model;
  require("./model/assetSuperType.model").Model;
  require("./model/assetType.model").Model;
  require("./model/assetVendor.model").Model;
  require("./model/building.model").Model;
  require("./model/depreciation.model").Model;
  require("./model/employee.model").Model;
  require("./model/location.model").Model;
  require("./model/vendor.model").Model;
}

module.exports = { connect, close, registerModels };
