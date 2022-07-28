const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = mongoose.Schema(
  {
    idCompeticion: {
      type: Schema.ObjectId,
      ref: "Competicion",
      required: true,
    },
    idPartido: {
      type: Schema.ObjectId,
      ref: "Partido",
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    apellidos: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
    },
    codigopostal: {
      type: Number,
    },
    ciudad: {
      type: String,
    },
    provincia: {
      type: String,
    },
    imagenperfil: {
      data: Buffer,
      contentType: String,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: false }
);

const Usuario = mongoose.model("usuario", userSchema);

module.exports = Usuario;
