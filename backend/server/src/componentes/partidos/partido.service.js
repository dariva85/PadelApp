const { Router } = require("express");
const { catchErrors } = require("../../errors");
const matchControllers = require("./partido.controllers");
const userControllers = require("../usuarios/usuario.controllers");
const competitionControllers = require("../competiciones/competicion.controllers");
const routerCompeticiones = require("../competiciones/competicion.service");
const routerUsuarios = require("../usuarios/usuario.service");

const routerPartidos = Router();

routerPartidos.post("/", catchErrors(matchControllers.createOne));
routerPartidos
  .route("/:id")
  .put(catchErrors(matchControllers.updateOne))
  .get(catchErrors(matchControllers.findOne))
  .delete(catchErrors(matchControllers.deleteOne));
routerPartidos
  .route("/userId/:id")
  .get(catchErrors(matchControllers.findAllMatchesByUserId));
routerPartidos
  .route("/updatePartido/userId/:id")
  .put(catchErrors(matchControllers.submitMatchesResult));

module.exports = routerPartidos;
