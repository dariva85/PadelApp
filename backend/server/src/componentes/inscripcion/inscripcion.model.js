const mongoose = require("mongoose");
const { Schema } = mongoose;

const inscriptionSchema = mongoose.Schema(
  {
    idCompeticion: {
      type: Schema.ObjectId,
      ref: "competiciones",
    },

    fechaInicio: {
      type: Date,
      required: true,
    },
    fechaFin: {
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
    inscritos: {
      type: Array,
      default: [],
    },
    partidos: {
      type: Array,
      default: [],
    },
    pistas: {
      type: Array,
      default: [],
    },
  },
  { timestamps: false }
);

const Inscriptions = mongoose.model("inscripciones", inscriptionSchema);

module.exports = Inscriptions;
