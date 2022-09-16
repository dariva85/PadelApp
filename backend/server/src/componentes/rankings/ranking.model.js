const mongoose = require("mongoose");
const { Schema } = mongoose;

const scoreboard = new Schema({
  posicion: Number,
  nombre: {
    type: Schema.ObjectId,
    ref: "usuarios",
  },
  puntos: Number,
  tendencia: Number,
  partidosJugados: Number,
  partidosGanados: Number,
  partidosPerdidos: Number,
  puntosAFavor: Number,
  puntosEnContra: Number,
  efficiencia: Number,
  efficienciaPuntos: Number,
});

const rankingSchema = mongoose.Schema(
  {
    idCompeticion: {
      type: Schema.ObjectId,
      ref: "competiciones",
    },
    idUsuario: {
      type: Schema.ObjectId,
      ref: "usuarios",
    },
    clasificacion: scoreboard,
  },
  { timestamps: false }
);

const Ranking = mongoose.model("rankings", rankingSchema);

module.exports = Ranking;
