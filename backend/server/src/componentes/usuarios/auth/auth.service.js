//Auth Service
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../../config");
const User = require('../usuario.model');

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

const comparePasswords = async (password, dbPassword) => {
  return bcrypt.compare(password, dbPassword);
};

const createToken = (email) => {
  const token = jwt.sign({ email }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRATION,
  });
  return {
    accessToken: token,
    tokenType: "Bearer",
    expiresIn: config.JWT_EXPIRATION,
  };
};

const decodeToken = (token) => {
  try {
    const result = jwt.verify(token, config.JWT_SECRET);
    return result;
  } catch (e) {
    switch (e.name) {
      case "JsonWebTokenError": {
        // Provisional hasta que se implemente el control de errores
        throw "Json Web Token Error";
        break;
      }
      case "TokenExpiredError": {
        // Provisional hasta que se implemente el control de errores
        throw "Token Expired";
        break;
      }
      default:
        throw e;
    }
  }
};

const createUser = async ({ username, nombre, apellidos, email, password: plaintextPassword }) => {
  const encryptedPassword = await encryptPassword(plaintextPassword);
  return await User.create({ username, nombre, apellidos, email, password: encryptedPassword });
};

const authenticateUser = async ({ email, password }) => {
  if (!email || !password) {
    //Error
  }
  const user = await User.findOne({ email }).select("+password").lean().exec();
  if (!user) {
    //Error
  }
  const passwordMatches = await comparePasswords(password, user.password);
  if (!passwordMatches) {
    //Error
  }
  const token = createToken(email);
  return token;
};

module.exports = {
  encryptPassword,
  comparePasswords,
  createToken,
  decodeToken,
  createUser,
  authenticateUser,
};
