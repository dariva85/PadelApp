//Middleware
const auth = require("./auth.service");

const needsAuthToken = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    if (!header) {
      //Error
    }
    if (!header.startsWith("Bearer ")) {
      //Error
    }
    const token = header.slice("Bearer ".length);
    const { email } = auth.decodeToken(token);
    // TODO: opcional: cargar los datos del usuario
    req.userEmail = email;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  needsAuthToken,
};
