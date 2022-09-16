const Partido = require("./partido.model");
const Competicion = require("../competiciones/competicion.model");
const Usuario = require("../usuarios/usuario.model");
const { errMalformed } = require("../../errors");
const mongoose = require("mongoose");
const rankingUpdate = require("../rankings/rankingUpdate");

//Checked
const createOne = async (req, res) => {
  const newMatch = req.body;
  let doc = {};
  try {
    const doc = await Partido.create(newMatch);
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
    doc = await Partido.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
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
const findOne = async (req, res) => {
  const { id } = req.params;
  let doc = {};
  try {
    doc = await Partido.findOne({ _id: id });
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

//Checked
const deleteOne = async (req, res) => {
  const { id } = req.params;
  let doc = {};

  try {
    const doc = await Partido.findOneAndDelete({ _id: id }, { new: true });
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

//Checked
const findAllofOneCompetition = async (req, res) => {
  const { id } = req.params;
  let doc = {};

  try {
    doc = await Competicion.find({ partido: id }).lean().exec();
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
const findAllofOneUser = async (req, res) => {
  const { id } = req.params;
  let doc = {};
  try {
    doc = await Partido.find({ idUsuario: id }).lean().exec();
    if (doc === null) {
      errMalformed(res, `User with id '${id}' not found`, "NotFound");
    } else {
      res.status(200).json({ results: [doc] });
    }
  } catch (e) {
    console.log(e);
    if (Object.keys(doc).length === 0) {
      errMalformed(res, `${id} is not valid id`, "NotFound");
    } else {
      errMalformed(res, "", "");
    }
  }
};

const findAllMatchesByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await Partido.aggregate([
      [
        {
          $match: {
            idUsuario: mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "competiciones",
            localField: "idCompeticion",
            foreignField: "_id",
            as: "competicion",
          },
        },
        {
          $lookup: {
            from: "usuarios",
            localField: "idUsuario",
            foreignField: "_id",
            as: "usuario",
          },
        },
        {
          $project: {
            _id: 1,
            idUsuario: 1,
            idCompeticion: 1,
            estado: 1,
            fecha: 1,
            fechaValidacion: 1,
            direccion: 1,
            allScoreBoard: 1,
            allValidadores: 1,
            usuario: {
              _id: 1,
              username: 1,
            },
            competicion: 1,
          },
        },
      ],
    ]);

    if (doc === null) {
      errMalformed(res, `Ranking with id '${id}' not found`, "NotFound");
    } else {
      res.status(200).json({ results: [doc] });
    }
  } catch (e) {
    console.log(e);
    if (Object.keys(doc).length === 0) {
      errMalformed(res, `'${id}' is not valid id`, "NotFound");
    } else {
      errMalformed(res, "", "");
    }
  }
};

const objectsEqual = (o1, o2) =>
  Object.keys(o1).length === Object.keys(o2).length &&
  Object.keys(o1).every((p) => o1[p] === o2[p]);

const submitMatchesResult = async (req, res) => {
  const { id } = req.params;
  const { match } = req.body;
  try {
    doc = await Partido.findOne({ _id: match._id });
    if (doc === null) {
      errMalformed(res, `Match with id '${match._id}' not found`, "NotFound");
    }
    // Compruebo que no soy ya un validador.

    if (!doc.allValidadores.includes(id)) {
      let iguales = true;
      // Compruebo que los resultados sean los mismos.
      for (const index in doc.allScoreBoard) {
        if (
          doc.allScoreBoard[index].final_score[0].scoreboard ===
            match.allScoreBoard[index].final_score[0].scoreboard &&
          doc.allScoreBoard[index].final_score[1].scoreboard ===
            match.allScoreBoard[index].final_score[1].scoreboard
        ) {
          //console.log("Son iguales!");
        } else {
          //console.log("Son diferentes");
          iguales = false;
        }
      }
      // Si no son los mismos borro todos los validadores y me añado a validadores.
      if (!iguales) {
        doc = await Partido.findOneAndUpdate(
          { _id: match._id },
          {
            allValidadores: [mongoose.Types.ObjectId(id)],
            allScoreBoard: match.allScoreBoard,
          }
        );
      } else {
        console.log("Es el mismo!!!");
        console.log(doc.allValidadores.length);
        if (doc.allValidadores.length >= 2) {
          await rankingUpdate.UpdateRankingWithMatchResults(doc);
          doc = await Partido.findOneAndUpdate(
            { _id: match._id },
            {
              allValidadores: [
                ...doc.allValidadores,
                ...[mongoose.Types.ObjectId(id)],
              ],
              estado: "Closed",
            }
          );
        } else {
          doc = await Partido.findOneAndUpdate(
            { _id: match._id },
            {
              allValidadores: [
                ...doc.allValidadores,
                ...[mongoose.Types.ObjectId(id)],
              ],
            }
          );
        }
        // Si es el mismo y si tras añadirme la lista de validadores la longitud de esta lista es 3 o mayor, cambiar el estado del partido a "Closed".
      }

      doc = await Partido.findOne({ _id: match._id });
    } else {
      console.log("va bien!");
    }
  } catch (e) {
    if (Object.keys(doc).length === 0) {
      errMalformed(res, `Something went wrong`, "NotFound");
    } else {
      errMalformed(res, "", "");
    }
  }
  //let doc = {};
  res.status(200).json({ results: doc });
};

module.exports = {
  createOne,
  updateOne,
  findOne,
  deleteOne,
  findAllofOneCompetition,
  findAllofOneUser,
  findAllMatchesByUserId,
  submitMatchesResult,
};
