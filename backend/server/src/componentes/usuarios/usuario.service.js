const { Router } = require("express");
const { catchErrors } = require("../../errors");
const userControllers = require("./usuario.controllers");

const routerUsuarios = Router();
routerUsuarios.route("/").post(catchErrors(userControllers.createOne));

routerUsuarios
  .route("/:id")
  .put(catchErrors(userControllers.updateOne))
  .get(catchErrors(userControllers.findOne))
  .delete(catchErrors(userControllers.deleteOne));

//Este endpoint no es necesario. Usuario ya posee la lista de competiciones a la que pertenece.
routerUsuarios
  .route("/:id/competiciones")
  .get(catchErrors(userControllers.findAllofOneCompetition));

//Este endpoint no es necesario. Usuario ya posee la lista de partidos a la que pertenece.
routerUsuarios.route("/:id/partidos").get(catchErrors(userControllers.findAllofOneMatch));

module.exports = routerUsuarios;
