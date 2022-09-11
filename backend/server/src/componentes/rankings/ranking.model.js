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
  pardisosPerdidos: Number,
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
    clasificacion: [scoreboard],
  },
  { timestamps: false }
);

const Ranking = mongoose.model("rankings", rankingSchema);

module.exports = Ranking;
