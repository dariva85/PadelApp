const mongoose = require("mongoose");
const { Schema } = mongoose;

const childPair = new Schema({
  player: [{ type: Schema.ObjectId, required: true }],
  scoreboard: { type: Number, required: true },
}); //Este objeto es el par de jugadores de un equipo y su puntuacón.
const scoreboard = new Schema({ final_score: [childPair] }); //Son 2 equipos con sus dos puntuaciones

const partidoSchema = mongoose.Schema(
  {
    idUsuario: [
      {
        type: Schema.ObjectId,
        ref: "usuarios",
      },
    ],
    idCompeticion: {
      type: Schema.ObjectId,
      ref: "competiciones",
    },
    estado: {
      type: String,
      required: true,
      maxlength: 50,
    },
    fecha: {
      type: Date,
      required: true,
    },
    fechaValidacion: {
      type: Date,
    },
    direccion: {
      type: String,
      maxlength: 40,
    },
    allScoreBoard: [scoreboard],
    allValidadores: [
      {
        type: Schema.ObjectId,
        ref: "usuarios",
      },
    ],
  },
  { timestamps: false }
);

const Partido = mongoose.model("partidos", partidoSchema);
module.exports = Partido;
