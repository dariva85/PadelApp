const Inscripcion = require("./Inscripcion.model");
const Partido = require("../partidos/partido.model");
const { errMalformed } = require("../../errors");
const { generateMatches } = require("../partidos/matchGenerator");
const mongoose = require("mongoose");

//Checked
const createOne = async (req, res) => {
  const newInscription = req.body;
  let doc = {};

  try {
    doc = await Inscripcion.create(newInscription);
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
    doc = await Inscripcion.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (doc === null) {
      errMalformed(res, `Inscription with id '${id}' not found`, "NotFound");
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
    doc = await Inscripcion.findOne({ _id: id });
    if (doc === null) {
      errMalformed(res, `Inscripcion with id '${id}' not found`, "NotFound");
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
    doc = await Inscripcion.findOneAndDelete({ _id: id }, { new: true });
    if (doc === null) {
      errMalformed(res, `Inscripcion with id '${id}' not found`, "NotFound");
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

const findAllOpened = async (req, res) => {
  const { id } = req.params;
  let doc = {};

  try {
    let currentDate = new Date().toISOString();

    doc = await Inscripcion.find({
      idCompeticion: id,
      fechaInicio: { $lte: currentDate },
      fechaFin: { $gte: currentDate },
    })
      .lean()
      .exec();
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

const SignUpOnCompetition = async (req, res) => {
  const { userId, inscriptionId } = req.body;
  let doc = {};
  try {
    doc = await Inscripcion.find({ _id: inscriptionId }).lean().exec();

    if (doc !== null) {
      if (doc[0].inscritos.includes(userId)) {
        const index = doc[0].inscritos.indexOf(userId);
        if (index > -1) {
          doc[0].inscritos.splice(index, 1);
        }
      } else {
        doc[0].inscritos.push(userId);
      }

      doc[0].partidos.forEach(async (match) => {
        result = await Partido.findOneAndDelete({
          _id: mongoose.Types.ObjectId(match._id),
        });
      });

      let { matches, inscription } = await generateMatches(doc[0]);

      matches.forEach(async (match) => {
        result = await Partido.create(match);
      });

      doc = await Inscripcion.findOneAndUpdate(
        { _id: inscriptionId },
        inscription,
        {
          new: true,
        }
      )
        .lean()
        .exec();
      res.status(200).json({ results: [doc] });
    } else {
      errMalformed(
        res,
        `Inscription id '${inscriptionId}' not found`,
        "NotFound"
      );
    }
  } catch (e) {
    console.log(e);
    if (Object.keys(doc).length === 0) {
      errMalformed(res, `'${inscritpionId}' is not valid id`, "NotFound");
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
  SignUpOnCompetition,
  findAllOpened,
};
