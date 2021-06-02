module.exports = {
  registerData: {
    type: "object",
    properties: {
      registerData: {
        type: "object",
        properties: {
          username: { type: "string" },
          password: { type: "string" },
          confirmPassword: { type: "string" },
          fullname: { type: "string" },
        },
      },
    },
  },
  loginData: {
    type: "object",
    properties: {
      username: { type: "string" },
      password: { type: "string" },
    },
  },
  refreshToken: {
    type: "object",
    properties: {
      refreshToken: { type: "string" },
    },
  },
  userData: {
    type: "object",
    properties: {
      userData: {
        type: "object",
        properties: {
          username: { type: "string" },
          fullname: { type: "string" },
          role: { type: "string" },
        },
      },
    },
  },
  avatarData: {
    type: "object",
    properties: {
      avatarData: {
        type: "object",
        properties: {
          filename: { type: "string" },
          file: { type: "string" },
        },
      },
    },
  },
  roleData: {
    type: "object",
    properties: {
      roleData: {
        type: "object",
        properties: {
          nama: { type: "string" },
          masterData: {
            type: "object",
            properties: {
              view: { type: "boolean", default: false },
              create: { type: "boolean", default: false },
              update: { type: "boolean", default: false },
              delete: { type: "boolean", default: false },
            },
          },
          user: {
            type: "object",
            properties: {
              view: { type: "boolean", default: true },
              create: { type: "boolean", default: false },
              update: { type: "boolean", default: false },
              delete: { type: "boolean", default: false },
            },
          },
        },
      },
    },
  },

  assetData: {
    type: "object",
    properties: {
      name: { type: "string" },
      brandName: { type: "string" },
      modelNumber: { type: "string" },
      desc: { type: "string" },
      assetType: { type: "string" },
      createdBy: { type: "string" },
      createdAt: { type: "date" },
      updatedBy: { type: "string" },
      updatedAt: { type: "date" },
      deletedBy: { type: "string" },
      deletedAt: { type: "date" },
    },
  },

  assetSuperTypeData: {
    type: "object",
    properties: {
      name: { type: "string" },
      desc: { type: "string" },
    },
  },

  assetTypeData: {
    type: "object",
    properties: {
      name: { type: "string" },
      desc: { type: "string" },
      assetSuperType: { type: "string" },
      defaultDepreciationDuration: { type: "Number" },
    },
  },

  assetVendorData: {
    type: "object",
    properties: {
      asset: { type: "string" },
      vendor: { type: "string" },
      depreciation: {
        type: "object",
        properties: {
          name: { type: "string" },
          duration: { type: "Number" },
          manufactureDate: { type: "Date" },
          disposeDate: { type: "Date" },
        },
      },
      createdBy: { type: "string" },
      createdAt: { type: "date" },
      updatedBy: { type: "string" },
      updatedAt: { type: "date" },
      deletedBy: { type: "string" },
      deletedAt: { type: "date" },
      isArchived: { type: "Boolean", default: false },
    },
  },

  buildingData: {
    type: "object",
    properties: {
      name: { type: "string" },
      desc: { type: "string" },
      city: { type: "string" },
      state: { type: "string" },
      zipCode: { type: "string" },
      address: { type: "string" },
    },
  },

  employeeData: {
    type: "object",
    properties: {
      fullname: { type: "string" },
      location: { type: "string" },
    },
  },

  locationData: {
    type: "object",
    properties: {
      name: { type: "string" },
      desc: { type: "string" },
      building: { type: "string" },
    },
  },

  vendorData: {
    type: "object",
    properties: {
      name: { type: "string" },
      city: { type: "string" },
      state: { type: "string" },
      zipCode: { type: "string" },
      accountManagerName: { type: "string" },
      accountManagerPhone: { type: "string" },
    },
  },
};
