require("dotenv").config();

const envVarNames = ["SERVER_PORT"];

let envVars = {};

envVarNames.forEach((varName) => {
  if (process.env[varName] === undefined) {
    throw new Error(`Missing environment variable '${varName}'`);
  }
  envVars[varName] = process.env[varName];
});

module.exports = {
  ...envVars,
};
