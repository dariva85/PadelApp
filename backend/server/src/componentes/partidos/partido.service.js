const { Router } = require("express");
const matchControllers = require("./partido.controllers");
const userControllers = require("../usuarios/usuario.controllers");
const competitionControllers = require("../competiciones/competicion.controllers");
const routerCompeticiones = require("../competiciones/competicion.service");
const routerUsuarios = require("../usuarios/usuario.service");

const routerPartidos = Router();

routerPartidos.post("/", matchControllers.createOne);
routerPartidos.put("/:id", matchControllers.updateOne);
routerPartidos.get("/:id", matchControllers.findOne);
routerPartidos.delete("/:id", matchControllers.deleteOne);
/// NOT WORKING routerCompeticiones.get("/:id/partidos",competitionControllers.findAllofOneMatch);
/// NOT WORKING  routerUsuarios.get("/:id/partidos", userControllers.findAllofOneMatch);

module.exports = routerPartidos;
