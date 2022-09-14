const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");
const db = require("./db");
const {
  needsAuthToken,
} = require("./componentes/usuarios/auth/auth.middleware");
const { errorHandler, ApiError, catchErrors } = require("./errors");
const UserRouter = require("./componentes/usuarios/usuario.service.js");
const PartidoRouter = require("./componentes/partidos/partido.service.js");
const CompeticionRouter = require("./componentes/competiciones/competicion.service.js");
const RankingRouter = require("./componentes/rankings/ranking.service.js");
const InscripcionRouter = require("./componentes/inscripcion/inscripcion.service.js");
const { RunMatchTimeoutValidator } = require("./MatchTimeoutValidator");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));

//Hay que habilitar todos los endpoints que se vayan a utilizar
app.use("/usuarios/", needsAuthToken, UserRouter);
app.use("/partidos/", needsAuthToken, PartidoRouter);
app.use("/competiciones/", needsAuthToken, CompeticionRouter);
app.use("/rankings/", needsAuthToken, RankingRouter);
app.use("/inscription/", needsAuthToken, InscripcionRouter);
// NOT WORKING YET app.use("/", InscripcionRouter);
//Este endpoint está en usuario pero no está atado al path "/usuarios"
require("./componentes/usuarios/usuario.controllers").addRoutesTo(app);

app.get("/", async (req, res) => {
  res.status(200).json({ ok: true });
});

app.all("/*", async (req, res, next) => {
  next(new ApiError(404, `Not Found`));
});

app.use(errorHandler);

const start = async () => {
  await db.connect();
  app.listen(config.SERVER_PORT, () => {
    console.log(`Padel App Server listening on port: ${config.SERVER_PORT}`);
  });
  RunMatchTimeoutValidator();
};

start();
