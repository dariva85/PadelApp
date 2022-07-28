const mongoose = require("mongoose");
const { Schema } = mongoose;

const competicionSchema = mongoose.Schema(
  {
    idUsuario: {
      type: Schema.ObjectId,
      ref: "Usuario",
    },
    idPartido: {
      type: Schema.ObjectId,
      ref: "Partido",
    },
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
    ninscritos: {
      type: Number,
      required: true,
    },
    ntotal: {
      type: Number,
      required: true,
    },
    reglas: {
      type: String,
      maxlength: 400,
    },
    fechainicio: {
      type: Date,
      required: true,
    },
    fechafin: {
      type: Date,
      required: true,
    },
    fechapartidos: {
      type: Date,
      required: true,
    },
  },
  { timestamps: false }
);

const Competicion = mongoose.model("competicion", competicionSchema);

module.exports = Competicion;
