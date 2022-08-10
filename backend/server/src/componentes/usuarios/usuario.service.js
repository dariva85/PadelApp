const { Router } = require("express");
const userControllers = require("./usuario.controllers");

const routerUsuarios = Router();
routerUsuarios.route("/").post(userControllers.createOne);
routerUsuarios
  .route("/:id")
  .put(userControllers.updateOne)
  .get(userControllers.findOne)
  .delete(userControllers.deleteOne);

//Este endpoint no es necesario. Usuario ya posee la lista de competiciones a la que pertenece.
routerUsuarios
  .route("/:id/competiciones")
  .get(userControllers.findAllofOneCompetition);

//Este endpoint no es necesario. Usuario ya posee la lista de partidos a la que pertenece.
routerUsuarios.route("/:id/partidos").get(userControllers.findAllofOneMatch);

module.exports = routerUsuarios;
