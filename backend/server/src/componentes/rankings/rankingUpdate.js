const { default: mongoose } = require("mongoose");
const Partido = require("../partidos/partido.model");
const Ranking = require("./ranking.model");

const UpdateRankingWithMatchResults = async (match) => {
  try {
    doc = await Ranking.find({
      idUsuario: {
        $in: match.idUsuario,
      },
      idCompeticion: match.idCompeticion,
    });

    if (doc !== null && doc.length === 4) {
      await doc.forEach(async (userRanking) => {
        console.log(`userRanking before: ${userRanking}`);
        match.allScoreBoard.forEach((matchSet) => {
          if (matchSet.final_score[0].player.includes(userRanking.idUsuario)) {
            userRanking.clasificacion.partidosJugados++;
            if (
              matchSet.final_score[0].scoreboard >
              matchSet.final_score[1].scoreboard
            ) {
              userRanking.clasificacion.partidosGanados++;
            } else {
              userRanking.clasificacion.partidosPerdidos++;
            }
            userRanking.clasificacion.puntosAFavor +=
              matchSet.final_score[0].scoreboard;
            userRanking.clasificacion.puntosEnContra +=
              matchSet.final_score[1].scoreboard;
          }
          if (matchSet.final_score[1].player.includes(userRanking.idUsuario)) {
            userRanking.clasificacion.partidosJugados++;
            if (
              matchSet.final_score[1].scoreboard >
              matchSet.final_score[0].scoreboard
            ) {
              userRanking.clasificacion.partidosGanados++;
            } else {
              userRanking.clasificacion.partidosPerdidos++;
            }
            userRanking.clasificacion.puntosAFavor +=
              matchSet.final_score[1].scoreboard;
            userRanking.clasificacion.puntosEnContra +=
              matchSet.final_score[0].scoreboard;
          }
        });

        let _old_eff = userRanking.clasificacion.efficiencia;
        userRanking.clasificacion.efficiencia = (
          (userRanking.clasificacion.partidosGanados -
            userRanking.clasificacion.partidosPerdidos) /
          userRanking.clasificacion.partidosJugados
        ).toFixed(2);
        if (Math.abs(_old_eff - userRanking.clasificacion.efficiencia) > 0.02) {
          if (_old_eff > userRanking.clasificacion.efficiencia)
            userRanking.clasificacion.tendencia = -1;
          else userRanking.clasificacion.tendencia = 1;
        } else {
          userRanking.clasificacion.tendencia = 0;
        }
        userRanking.clasificacion.efficienciaPuntos = (
          (userRanking.clasificacion.puntosAFavor -
            userRanking.clasificacion.puntosEnContra) /
          (userRanking.clasificacion.puntosAFavor +
            userRanking.clasificacion.puntosEnContra)
        ).toFixed(2);

        let updateResult = await Ranking.findOneAndUpdate(
          { _id: userRanking._id },
          userRanking,
          {
            new: true,
          }
        );
        console.log(updateResult);
      });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  UpdateRankingWithMatchResults,
};
