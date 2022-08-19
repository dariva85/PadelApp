const mongoose = require("mongoose");
const { Schema } = mongoose;

const competicionSchema = mongoose.Schema(
  {
    idUsuario: [
      {
        type: Schema.ObjectId,
        ref: "usuarios",
      },
    ],
    idPartido: [
      {
        type: Schema.ObjectId,
        ref: "partidos",
      },
    ],
    nombre: {
      type: String,
      required: true,
      maxlength: 30,
    },
    descripcion: {
      type: String,
      required: true,
      maxlength: 400,
    },
    direccion: {
      type: String,
      maxlength: 40,
      required: true,
    },
    nInscritos: {
      type: Number,
      required: true,
    },
    maxInscritos: {
      type: Number,
      required: true,
    },
    reglas: {
      type: String,
      maxlength: 400,
    },
    fechaInicio: {
      type: Date,
      required: true,
    },
    fechaFin: {
      type: Date,
      required: true,
    },
    fechaPartidos: [
      {
        type: Date,
        required: true,
      },
    ],
    tipo: {
      type: String,
      maxlength: 20,
    },
  },
  { timestamps: false }
);

const Competicion = mongoose.model("competiciones", competicionSchema);

module.exports = Competicion;
