const { Router } = require("express");
const competitionControllers = require("./competicion.controllers");
const userControllers = require("../usuarios/usuario.controllers");
const matchControllers = require("../partidos/partido.controllers");
const routerPartidos = require("../partidos/partido.service");
const routerUsuarios = require("../usuarios/usuario.service");

const routerCompeticiones = Router();

routerCompeticiones.post("/", competitionControllers.createOne);
routerCompeticiones
  .route("/:id")
  .put(competitionControllers.updateOne)
  .get(competitionControllers.findOne)
  .delete(competitionControllers.deleteOne);

module.exports = routerCompeticiones;
