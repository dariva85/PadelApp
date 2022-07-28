const mongoose = require("mongoose");
const { Schema } = mongoose;

const rankingSchema = mongoose.Schema(
  {
    idCompeticion: {
      type: Schema.ObjectId,
      ref: "Competicion",
    },
    clasificacion: [
      {
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
      },
    ],
  },
  { timestamps: false }
);

const Ranking = mongoose.model("ranking", rankingSchema);

module.exports = Ranking;
