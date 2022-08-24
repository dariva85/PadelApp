const { Router } = require("express");
const { catchErrors } = require("../../errors");
const competitionControllers = require("./competicion.controllers");
const userControllers = require("../usuarios/usuario.controllers");
const matchControllers = require("../partidos/partido.controllers");
const routerPartidos = require("../partidos/partido.service");
const routerUsuarios = require("../usuarios/usuario.service");

const routerCompeticiones = Router();

routerCompeticiones.post("/", catchErrors(competitionControllers.createOne));
routerCompeticiones
  .route("/:id")
  .put(catchErrors(competitionControllers.updateOne))
  .get(catchErrors(competitionControllers.findOne))
  .delete(catchErrors(competitionControllers.deleteOne));

module.exports = routerCompeticiones;
