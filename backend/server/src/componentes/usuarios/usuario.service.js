const { Router } = require("express");
const userControllers = require("./usuario.controllers");

const routerUsuarios = Router();
routerUsuarios.route("/").post(userControllers.createOne);
routerUsuarios
  .route("/:id")
  .put(userControllers.updateOne)
  .get(userControllers.findOne)
  .delete(userControllers.deleteOne);

routerUsuarios
  .route("/:id/competiciones")
  .get(userControllers.findAllofOneCompetition);
routerUsuarios.route("/:id/partidos").get(userControllers.findAllofOneMatch);

module.exports = routerUsuarios;
