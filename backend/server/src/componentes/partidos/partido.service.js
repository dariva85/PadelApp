const { Router } = require("express");
const matchControllers = require("./partido.controllers");
const userControllers = require("../usuarios/usuario.controllers");
const competitionControllers = require("../competiciones/competicion.controllers");
const routerCompeticiones = require("../competiciones/competicion.service");
const routerUsuarios = require("../usuarios/usuario.service");

const routerPartidos = Router();

routerPartidos.post("/", matchControllers.createOne);
routerPartidos
  .route("/:id")
  .put(matchControllers.updateOne)
  .get(matchControllers.findOne)
  .delete(matchControllers.deleteOne);

module.exports = routerPartidos;
