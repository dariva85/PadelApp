const { Router } = require("express");
const competitionControllers = require("./competicion.controllers");
const userControllers = require("../usuarios/usuario.controllers");
const matchControllers = require("../partidos/partido.controllers");
const routerPartidos = require("../partidos/partido.service");
const routerUsuarios = require("../usuarios/usuario.service");

const routerCompeticiones = Router();

routerCompeticiones.post("/", competitionControllers.createOne);
routerCompeticiones.put("/:id", competitionControllers.updateOne);
routerCompeticiones.get("/:id", competitionControllers.findOne);
routerCompeticiones.delete("/:id", competitionControllers.deleteOne);
routerPartidos.get(
  "/:id/competiciones",
  matchControllers.findAllofOneCompetition
);
routerUsuarios.get(
  "/:id/competiciones",
  userControllers.findAllofOneCompetition
);

module.exports = routerCompeticiones;
