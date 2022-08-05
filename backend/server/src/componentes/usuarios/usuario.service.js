const { Router } = require("express");
const userControllers = require("./usuario.controllers");
const matchControllers = require("../componentes/partidos/partido.controllers");
const competitionControllers = require("../competiciones/competicion.controllers");
const routerCompeticiones = require("../competiciones/competicion.service");
const routerPartidos = require("../componentes/partidos/partido.service");

const routerUsuarios = Router();

routerUsuarios.post("/", userControllers.createOne);
routerUsuarios.put("/:id", userControllers.updateOne);
routerUsuarios.get("/:id", userControllers.findOne);
routerUsuarios.delete("/:id", userControllers.deleteOne);
routerCompeticiones.get(
  "/:id/usuarios",
  competitionControllers.findAllofOneUser
);
routerPartidos.get("/:id/usuarios", matchControllers.findAllofOneUser);

module.exports = routerUsuarios;
