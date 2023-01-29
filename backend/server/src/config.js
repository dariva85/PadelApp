require("dotenv").config();

const envVarNames = [
  "JWT_SECRET",
  "JWT_EXPIRATION",
  "SERVER_PORT",
  "DB_USER",
  "DB_PASSWORD",
  "DB_HOST",
  "DB_PORT",
  "DB_DATABASE",
  "FRONT_DIR",
  "GOOGLE_CLIENT_ID",
];

let envVars = {};

envVarNames.forEach((varName) => {
  if (process.env[varName] === undefined) {
    throw new Error(`Missing environment variable '${varName}'`);
  }
  envVars[varName] = process.env[varName];
});

const getMongoURL = () => {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = envVars;
  return `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?authSource=admin`;
};

module.exports = {
  ...envVars,
  MONGO_URL: getMongoURL(),
};
