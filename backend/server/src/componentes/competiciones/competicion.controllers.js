const Competicion = require("./competicion.model");
const Usuario = require("../usuarios/usuario.model");
const Partido = require("../partidos/partido.model");
const { errMalformed } = require("../../errors");

//Checked
const createOne = async (req, res) => {
  const newCompetition = req.body;
  let doc = {};

  try {
    doc = await Competicion.create(newCompetition);
    res.status(200).json({ results: [doc] });
  } catch (e) {
    errMalformed(res, e.message, e.name);
  }
};
//Checked
const updateOne = async (req, res) => {
  const { id } = req.params;
  let doc = {};

  try {
    doc = await Competicion.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
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
const findOne = async (req, res) => {
  const { id } = req.params;
  let doc = {};

  try {
    doc = await Competicion.findOne({ _id: id });
    if (doc === null) {
      errMalformed(res, `Competition with id '${id}' not found`, "NotFound");
    } else {
      res.status(200).json({ results: [doc] });
    }
  } catch (e) {
    if (Object.keys(doc).length === 0) {
      errMalformed(res, `'${id}' is not valid id`, "NotFound");
    } else {
      errMalformed(res, "", "");
    }
  }
};

//Checked
const deleteOne = async (req, res) => {
  const { id } = req.params;
  let doc = {};

  try {
    doc = await Competicion.findOneAndDelete({ _id: id }, { new: true });
    if (doc === null) {
      errMalformed(res, `Competition with id '${id}' not found`, "NotFound");
    } else {
      res.status(200).json({ results: [doc] });
    }
  } catch (e) {
    if (Object.keys(doc).length === 0) {
      errMalformed(res, `'${id}' is not valid id`, "NotFound");
    } else {
      errMalformed(res, "", "");
    }
  }
};

const findAllofOneUser = async (req, res) => {
  const { id } = req.params;
  let doc = {};

  try {
    doc = await Competicion.find({ idUsuario: id }).lean().exec();
    if (doc === null) {
      errMalformed(res, `User with id '${id}' not found`, "NotFound");
    } else {
      res.status(200).json({ results: [doc] });
    }
  } catch (e) {
    if (Object.keys(doc).length === 0) {
      errMalformed(res, `'${id}' is not valid id`, "NotFound");
    } else {
      errMalformed(res, "", "");
    }
  }
};

const findAllofOneMatch = async (req, res) => {
  const { id } = req.params;
  let doc = {};

  try {
    doc = await Partido.find({ competicion: id }).lean().exec();
    if (doc === null) {
      errMalformed(res, `Match with id '${id}' not found`, "NotFound");
    } else {
      res.status(200).json({ results: [doc] });
    }
  } catch (e) {
    if (Object.keys(doc).length === 0) {
      errMalformed(res, `'${id}' is not valid id`, "NotFound");
    } else {
      errMalformed(res, "", "");
    }
  }
};

module.exports = {
  createOne,
  updateOne,
  findOne,
  deleteOne,
  findAllofOneUser,
  findAllofOneMatch,
};
