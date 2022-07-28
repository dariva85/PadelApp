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
      maxlength: 20,
    },
    apellidos: {
      type: String,
      required: true,
      maxlength: 30,
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
      maxlength: 15,
    },
    direccion: {
      type: String,
    },
    codigopostal: {
      type: Number,
    },
    ciudad: {
      type: String,
      maxlength: 15,
    },
    provincia: {
      type: String,
      maxlength: 15,
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
