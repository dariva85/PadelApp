const { default: mongoose } = require("mongoose");
const Partido = require("./componentes/partidos/partido.model");
const rankingUpdate = require("./componentes/rankings/rankingUpdate");

const RunMatchTimeoutValidator = async () => {
  setInterval(() => {
    ValidateTimedOutMatches();
  }, 3600000);
};

const ValidateTimedOutMatches = async () => {
  try {
    let currentDate = new Date().toISOString();
    let TimedOutMatches = await Partido.find({
      fechaValidacion: { $lte: currentDate },
      estado: { $eq: "Pending" },
    })
      .lean()
      .exec();

    TimedOutMatches.map(async (match) => {
      match.estado = "Closed";

      await Partido.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(match._id) },
        { estado: match.estado },
        {
          new: true,
        }
      );
      await rankingUpdate.UpdateRankingWithMatchResults(match);
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  RunMatchTimeoutValidator,
};
