const Partido = require("./partido.model");
const Competicion = require("../competiciones/competicion.model");
const Usuario = require("../usuarios/usuario.model");
const { errMalformed } = require("../../errors");

//Checked
const createOne = async (req, res) => {
  const newMatch = req.body;
  let doc = {};
  try {
    const doc = await Partido.create(newMatch);
    res.status(200).json({ results: [doc] });
  } catch(e) {
      errMalformed(res, e.message, e.name);
  }
};

//Checked
const updateOne = async (req, res) => {
  const { id } = req.params;
  let doc = {};
  try {
    doc = await Partido.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if(doc === null) {
      errMalformed(res, `Match with id '${id}' not found`, 'NotFound');
    } else {
      res.status(200).json({ results: [doc] });
    }
  } catch(e) {
    if (Object.keys(doc).length === 0) {
      errMalformed(res, `'${id}' is not valid id`, 'NotFound');
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
    doc = await Partido.findOne({ _id: id });
    if(doc === null) {
      errMalformed(res, `Match with id '${id}' not found`, 'NotFound');
    } else {
      res.status(200).json({ results: [doc] });
    }
  } catch(e) {
    if (Object.keys(doc).length === 0) {
      errMalformed(res, `'${id}' is not valid id`, 'NotFound');
    } else {
      errMalformed(res, '', '');
    }
  }
};

//Checked
const deleteOne = async (req, res) => {
  const { id } = req.params;
  let doc = {};

  try {
    const doc = await Partido.findOneAndDelete({ _id: id }, { new: true });
    if(doc === null) {
      errMalformed(res, `Match with id '${id}' not found`, 'NotFound');
    } else {
      res.status(200).json({ results: [doc] });
    }
  } catch(e) {
    if (Object.keys(doc).length === 0) {
      errMalformed(res, `'${id}' is not valid id`, 'NotFound');
    } else {
      errMalformed(res, '', '');
    }
  }
};

//Checked
const findAllofOneCompetition = async (req, res) => {
  const { id } = req.params;
  let doc = {};

  try {
    doc = await Competicion.find({ partido: id }).lean().exec();
    if(doc === null) {
      errMalformed(res, `Competition with id '${id}' not found`, 'NotFound');
    } else {
      res.status(200).json({ results: [doc] });
    }
  } catch(e) {
    if (Object.keys(doc).length === 0) {
      errMalformed(res, `'${id}' is not valid id`, 'NotFound');
    } else {
      errMalformed(res, '', '');
    }
  }
};

//Checked
const findAllofOneUser = async (req, res) => {
  const { id } = req.params;
  const doc = {};

  try {
    doc = await Usuario.find({ partido: id }).lean().exec();
    if(doc === null) {
      errMalformed(res, `User with id '${id}' not found`, 'NotFound');
    } else {
      res.status(200).json({ results: [doc] });
    }
  } catch(e) {
    if (Object.keys(doc).length === 0) {
      errMalformed(res, `'${id}' is not valid id`, 'NotFound');
    } else {
      errMalformed(res, '', '');
    }
  }
};

module.exports = {
  createOne,
  updateOne,
  findOne,
  deleteOne,
  findAllofOneCompetition,
  findAllofOneUser,
};
