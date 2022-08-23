const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");
const db = require("./db");
const UserRouter = require("./componentes/usuarios/usuario.service.js");
const PartidoRouter = require("./componentes/partidos/partido.service.js");
const CompeticionRouter = require("./componentes/competiciones/competicion.service.js");
const RankingRouter = require("./componentes/rankings/ranking.service.js");
//const InscripcionRouter = require("./componentes/inscripcion/inscripcion.service.js");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

require("./componentes/usuarios/usuario.controllers").addRoutesTo(app);

//Hay que habilitar todos los endpoints que se vayan a utilizar
app.use("/usuarios/", UserRouter);
app.use("/partidos/", PartidoRouter);
app.use("/competiciones/", CompeticionRouter);
app.use("/rankings/", RankingRouter);
// NOT WORKING YET app.use("/", InscripcionRouter);

app.get("/", async (req, res) => {
  res.status(200).json({ ok: true });
});

const start = async () => {
  await db.connect();
  app.listen(config.SERVER_PORT, () => {
    console.log(`Padel App Server listening on port: ${config.SERVER_PORT}`);
  });
};

start();
