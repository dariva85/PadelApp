const { needsAuthToken } = require("./auth/auth.middleware");
const { errMalformed } = require("../../errors");
const Usuario = require("./usuario.model");
const Auth = require("./auth/auth.service");
const Competicion = require("../competiciones/competicion.model");
const Partido = require("../partidos/partido.model");

const login = async (req, res) => {
  try {
    const loginData = req.body;
    console.log(loginData);
    const token = await Auth.authenticateUser(loginData);
    res.status(200).json(token);
  } catch (e) {
    if (e == "InvalidData") {
      errMalformed(res, e, "ValidationError");
    } else {
      errMalformed(res, e, "");
    }
  }
};

const register = async (req, res) => {
  const userData = req.body;
  try {
    await Auth.createUser(userData);
  } catch (e) {
    switch (e.name) {
      default:
        throw e;
    }
  }
  res.status(200).json({ status: `User created` });
};

const addRoutesTo = (app) => {
  app.post("/register", register);
  app.post("/login", login);
};

//Checked
const createOne = async (req, res) => {
  let doc = {};

  try {
    const newUser = req.body;
    console.log(newUser);
    console.log(req.params);
    doc = await Usuario.create(newUser);
    res.status(200).json({ results: [doc] });
  } catch (e) {
    if (e.code === 11000) {
      errMalformed(res, e, "DuplicateValue");
    } else {
      errMalformed(res, e, e.name);
    }
  }
};

//Checked
const updateOne = async (req, res) => {
  const { id } = req.params;
  let doc = {};

  try {
    doc = await Usuario.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (doc === null) {
      errMalformed(res, `User with id '${id}' not found`, "NotFound");
    } else {
      res.status(200).json({ results: [doc] });
    }
  } catch (e) {
    if (Object.keys(doc).length === 0) {
      errMalformed(res, `'${id}' is not valid id`, "NotFound");
    } else {
      console.log(e);
      errMalformed(res, e.message, e.name);
    }
  }
};

//Checked
const findOne = async (req, res) => {
  const { id } = req.params;
  let doc = {};
  console.log(id);

  try {
    doc = await Usuario.findById(id).lean().exec();
    if (doc === null) {
      errMalformed(res, `User with id '${id}' not found`, "NotFound");
    } else {
      res.status(200).json({ results: [doc] });
    }
  } catch (e) {
    if (Object.keys(doc).length === 0) {
      errMalformed(res, `'${id}' is not valid id`, "NotFound");
    } else {
      console.log(e);
      errMalformed(res, e.message, e.name);
    }
  }
};

//Checked
const findOneByEmail = async (req, res) => {
  const { email } = req.params;
  let doc = {};

  try {
    doc = await Usuario.findOne({ email: email }).lean().exec();
    if (doc === null) {
      errMalformed(res, `User with email '${email}' not found`, "NotFound");
    } else {
      res.status(200).json({ results: [doc] });
    }
  } catch (e) {
    if (Object.keys(doc).length === 0) {
      errMalformed(res, `'${email}' is not valid id`, "NotFound");
    } else {
      errMalformed(res, e.message, e.name);
    }
  }
};

//Checked
const deleteOne = async (req, res) => {
  const { id } = req.params;
  let doc = {};

  try {
    doc = await Usuario.findOneAndDelete({ _id: id }, { new: true });
    if (doc === null) {
      errMalformed(res, `User with id '${id}' not found`, "NotFound");
    } else {
      res.status(200).json({ results: [doc] });
    }
  } catch (e) {
    if (Object.keys(doc).length === 0) {
      errMalformed(res, `'${id}' is not valid id`, "NotFound");
    } else {
      console.log(e);
      errMalformed(res, e.message, e.name);
    }
  }
};

//Checked
const findAllofOneCompetition = async (req, res) => {
  const { id } = req.params;
  let doc = {};

  try {
    const doc = await Competicion.find({ usuario: id }).lean().exec();
    if (doc === null) {
      errMalformed(res, `Competition with id '${id}' not found`, "NotFound");
    } else {
      res.status(200).json({ results: [doc] });
    }
  } catch (e) {
    if (Object.keys(doc).length === 0) {
      errMalformed(res, `'${id}' is not valid id`, "NotFound");
    } else {
      console.log(e);
      errMalformed(res, e.message, e.name);
    }
  }
};

//Checked
const findAllofOneMatch = async (req, res) => {
  const { id } = req.params;
  let doc = {};

  try {
    doc = await Partido.find({ usuario: id }).lean().exec();
    if (doc === null) {
      errMalformed(res, `Match with id '${id}' not found`, "NotFound");
    } else {
      res.status(200).json({ results: [doc] });
    }
  } catch (e) {
    if (Object.keys(doc).length === 0) {
      errMalformed(res, `'${id}' is not valid id`, "NotFound");
    } else {
      console.log(e);
      errMalformed(res, e.message, e.name);
    }
  }
};

//Checked
const findTheName = async (req, res) => {
  const { id } = req.params;
  let doc = {};
  console.log(id);

  try {
    doc = await Usuario.findById(id).lean().exec();
    console.log(doc);
    if (doc === null) {
      errMalformed(res, `User with id '${id}' not found`, "NotFound");
    } else {
      res.status(200).json({ results: [doc.username] });
    }
  } catch (e) {
    if (Object.keys(doc).length === 0) {
      errMalformed(res, `'${id}' is not valid id`, "NotFound");
    } else {
      console.log(e);
      errMalformed(res, e.message, e.name);
    }
  }
};



module.exports = {
  addRoutesTo,
  createOne,
  updateOne,
  findOne,
  deleteOne,
  findAllofOneCompetition,
  findAllofOneMatch,
  findOneByEmail,
  findTheName,
};
