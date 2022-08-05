const mongoose = require("mongoose");
const { Schema } = mongoose;


const scoreboard = new Schema({
  posicion: Number,
  nombre: {
    type: Schema.ObjectId,
    ref: "Usuario",
  },
  puntos: Number,
  pj: Number,
  pg: Number,
  pp: Number,
  jf: Number,
  dj: Number,
}); 

const rankingSchema = mongoose.Schema(
  {
    idCompeticion: {
      type: Schema.ObjectId,
      ref: "Competicion",
    },
    clasificacion: [scoreboard],
  },
  { timestamps: false }
);

const Ranking = mongoose.model("Ranking", rankingSchema);

module.exports = Ranking;
