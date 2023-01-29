//Auth Service
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../../config");
const User = require("../usuario.model");
const { OAuth2Client } = require("google-auth-library");

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

const decodeGoogleToken = async (token) => {
  try {
    const client = new OAuth2Client(config.CLIENT_ID_GOOGLE);

    const decodedToken = await client.verifyIdToken({
      idToken: token,
      audience: config.GOOGLE_CLIENT_ID,
    });

    return decodedToken;
  } catch (e) {
    throw e;
  }
};

const createUser = async ({
  username,
  nombre,
  apellidos,
  email,
  password: plaintextPassword,
}) => {
  const encryptedPassword = await encryptPassword(plaintextPassword);
  return await User.create({
    username,
    nombre,
    apellidos,
    email,
    password: encryptedPassword,
  });
};

const authenticateUser = async ({ email, password }) => {
  if (!email || !password) {
    throw "InvalidData";
  }
  const user = await User.findOne({ email }).select("+password").lean().exec();
  if (!user) {
    throw "InvalidData";
  }
  const passwordMatches = await comparePasswords(password, user.password);
  if (!passwordMatches) {
    throw "InvalidData";
  }
  const token = createToken(email);
  return { token, user };
};

const authenticateUserWithGoogle = async ({ credential }) => {
  try {
    let token = null;

    const decodedToken = await decodeGoogleToken(credential);

    if (!decodedToken.payload) {
      throw "InvalidData";
    }

    let user = await User.findOne({ googleId: decodedToken.payload.sub })
      .lean()
      .exec();

    if (!user) {
      user = await CreateNewGoogleUser(decodedToken);
    }
    token = createToken(user.email);

    return { token, user };
  } catch (e) {
    console.log(`authenticatewithgoogle: ${e}`);
    throw e;
  }
};

const CreateNewGoogleUser = async (decodedToken) => {
  try {
    const newUser = await User.create({
      idCompeticion: [],
      idPartido: [],
      nombre: decodedToken.payload.name,
      apellidos: "",
      email: decodedToken.payload.email,
      telefono: "",
      movil: "",
      username: decodedToken.payload.name,
      direccion: "",
      codigoPostal: 0,
      ciudad: "",
      provincia: "",
      imagenPerfil: {},
      password: "",
      googleId: decodedToken.payload.sub,
    });

    return newUser;
  } catch (e) {
    throw "Este usuario ya existe";
  }
};

module.exports = {
  encryptPassword,
  comparePasswords,
  createToken,
  decodeToken,
  createUser,
  authenticateUser,
  authenticateUserWithGoogle,
};
