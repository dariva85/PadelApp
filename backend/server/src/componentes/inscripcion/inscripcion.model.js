const mongoose = require("mongoose");
const { Schema } = mongoose;

const inscrito = new Schema(
  {
    idUser: {
      type: Schema.ObjectId,
      ref: "Usuario",
    },
  },
  { timestamps: true }
);

const rankingSchema = mongoose.Schema(
  {
    allInscritos: [inscrito],
    idCompeticion: {
      type: Schema.ObjectId,
      ref: "Competicion",
    },

    fechaInicio: {
      type: Date,
      required: true,
    },
    fechaFinal: {
      type: Date,
      required: true,
    },
    titulo: {
      type: String,
      maxlength: 40,
      required: true,
    },
    fechaPartido: {
      type: Date,
      required: true,
    },
    maxNumParticipantes: {
      type: Number,
      required: true,
    },
    estado: {
      type: String,
      maxlength: 40,
      required: true,
    },
    allValidadores: [inscrito],
  },
  { timestamps: false }
);

const Ranking = mongoose.model("Inscripcion", rankingSchema);

module.exports = Ranking;
