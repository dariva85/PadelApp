const mongoose = require("mongoose");
const { Schema } = mongoose;

const childPair = new Schema({
  player: [{ type: String, required: true }],
  scoreboard: { type: Number, required: true },
}); //Este objeto es el par de jugadores de un equipo y su puntuacón.
const scoreboard = new Schema({ final_score: [childPair] }); //Son 2 equipos con sus dos puntuaciones

const partidoSchema = mongoose.Schema(
  {
    idUsuario: [
      {
        type: Schema.ObjectId,
        ref: "Usuario",
      },
    ],
    idCompeticion: {
      type: Schema.ObjectId,
      ref: "Competicion",
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
    fechavalidacion: {
      type: Date,
    },
    direccion: {
      type: String,
      maxlength: 40,
    },
    allscoreboard: [scoreboard],
  },
  { timestamps: false }
);

const Partido = mongoose.model("Partido", partidoSchema);

module.exports = Partido;
