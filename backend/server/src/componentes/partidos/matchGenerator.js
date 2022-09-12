const Partido = require("./partido.model");
const Ranking = require("../rankings/ranking.model");
const { default: mongoose } = require("mongoose");

const generateMatches = async (inscription) => {
  let playersPerMatch = [];
  let matches = [];
  let allowedToPlay = [];
  let match;
  let sortedAllowedToPlay = []

  inscription.partidos = [];
  if (inscription.inscritos.length >= 4) {
    for (let i = 0; i / 4 < Math.floor(inscription.inscritos.length / 4); i++) {
      allowedToPlay.push(inscription.inscritos[i]);
    }
    allowedToPlay = allowedToPlay.map((item) => mongoose.Types.ObjectId(item));

    sortedAllowedToPlay = await getSortedUsers(
      allowedToPlay,
      inscription.idCompeticion
    );

    for (let i = 0; i < sortedAllowedToPlay.length; i++) {
      playersPerMatch.push(sortedAllowedToPlay[i]); //
      if ((i + 1) % 4 == 0) {
        match = generateMatch(playersPerMatch, inscription);
        matches.push(match);
        inscription.partidos.push(match._id);
        playersPerMatch = [];
      }
    }
  }
  return { matches, inscription };
};

const getSortedUsers = async (users, competitionId) => {
  const doc = await Ranking.aggregate([
    {
      $match: {
        idUsuario: {
          $in: users,
        },
        idCompeticion: mongoose.Types.ObjectId(competitionId),
      },
    },
    {
      $sort: {
        "clasificacion.efficiencia": -1,
        "clasificacion.efficienciaPuntos": -1,
      },
    },
  ]);
  return doc.map((item) => item.idUsuario);
};

const generateMatch = (players, inscription) => {
  let match = new Partido();

  match.idUsuario = players;
  match.idCompeticion = inscription.idCompeticion;
  match.estado = "Pending";
  match.fecha = new Date(inscription.fechaPartido);
  match.fechaValidacion = new Date(
    new Date(inscription.fechaPartido).setDate(
      inscription.fechaPartido.getDate() + 10
    )
  );

  match.allScoreBoard = [
    {
      final_score: [
        { player: [players[0], players[1]], scoreboard: 0 },
        { player: [players[2], players[3]], scoreboard: 0 },
      ],
    },
    {
      final_score: [
        { player: [players[0], players[2]], scoreboard: 0 },
        { player: [players[1], players[3]], scoreboard: 0 },
      ],
    },
    {
      final_score: [
        { player: [players[0], players[3]], scoreboard: 0 },
        { player: [players[1], players[2]], scoreboard: 0 },
      ],
    },
  ];

  return match;
};

module.exports = {
  generateMatches,
};
