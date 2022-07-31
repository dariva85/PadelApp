const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = mongoose.Schema(
  {
    idCompeticion: [
      {
        type: Schema.ObjectId,
        ref: "Competicion",
      },
    ],
    idPartido: [
      {
        type: Schema.ObjectId,
        ref: "Partido",
      },
    ],
    nombre: {
      type: String,
      required: true,
      maxlength: 20,
    },
    apellidos: {
      type: String,
      required: true,
      maxlength: 40,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true, // trim hace que "  hello " == "  hello" == "hello " == "hello"
      lowercase: true, // // Always convert to lowercase
      maxlength: 320,
    },
    username: {
      type: String,
      required: true,
      maxlength: 20,
    },
    direccion: {
      type: String,
      maxlength: 40,
    },
    codigopostal: {
      type: Number,
      max: 99999,
    },
    ciudad: {
      type: String,
      maxlength: 20,
    },
    provincia: {
      type: String,
      maxlength: 20,
    },
    imagenperfil: {
      data: Buffer,
      contentType: String,
    },
    password: {
      type: String,
      required: true,
      select: false, // Hace que este Schema no retorne la contrasenya.
    },
  },
  { timestamps: false }
);

const Usuario = mongoose.model("Usuario", userSchema);

module.exports = Usuario;
