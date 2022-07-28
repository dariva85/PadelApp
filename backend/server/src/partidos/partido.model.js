const mongoose = require("mongoose");
const { Schema } = mongoose;

const partidoSchema = mongoose.Schema(
  {
    idUsuario: {
      type: Schema.ObjectId,
      ref: "Usuario",
    },
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
  },
  { timestamps: false }
);

const Partido = mongoose.model("partido", partidoSchema);

module.exports = Partido;
