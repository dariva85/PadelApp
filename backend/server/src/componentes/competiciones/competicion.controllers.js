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

const findAllNonSubribedOfOneUser = async (req, res) => {
  const { id } = req.params;
  let doc = {};
  console.log("findAllNonSubscribed");
  try {
    let currentDate = new Date().toISOString();
    doc = await Competicion.find({
      idUsuario: { $ne: id },
      fechaInicioInscripcion: { $lte: currentDate },
      fechaFinInscripcion: { $gte: currentDate },
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

const subscribeOrUnsubscribe = async (req, res) => {
  const { competitionId, userId } = req.params;
  let doc = {};

  try {
    doc = await Competicion.findOne({ _id: competitionId }).lean().exec();
    if (doc === null) {
      errMalformed(
        res,
        `Competition with id '${competitionId}' not found`,
        "NotFound"
      );
    }
    if (
      doc.idUsuario.some(function (idUsuario) {
        return idUsuario.equals(userId);
      })
    ) {
      const toRemove = doc.idUsuario.find(function (idUsuario) {
        return idUsuario.equals(userId);
      });
      const index = doc.idUsuario.indexOf(toRemove);
      if (index > -1) {
        doc.idUsuario.splice(index, 1);
      }
    } else {
      doc.idUsuario.push(userId);
    }
    doc = await Competicion.updateOne(
      { _id: competitionId },
      { idUsuario: doc.idUsuario },
      {
        new: true,
      }
    );

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
const getMatchesOfOneCompetition = async (req, res) => {
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

module.exports = {
  createOne,
  updateOne,
  findOne,
  deleteOne,
  findAllofOneUser,
  findAllNonSubribedOfOneUser,
  subscribeOrUnsubscribe,
  getMatchesOfOneCompetition,
};
