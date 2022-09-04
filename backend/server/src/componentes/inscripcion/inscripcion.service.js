const { Router } = require("express");
const { catchErrors } = require("../../errors");
const inscriptionControllers = require("./inscripcion.controllers");

const routerCompeticiones = Router();

routerCompeticiones.post("/", catchErrors(inscriptionControllers.createOne));
routerCompeticiones
  .route("/:id")
  .put(catchErrors(inscriptionControllers.updateOne))
  .get(catchErrors(inscriptionControllers.findOne))
  .delete(catchErrors(inscriptionControllers.deleteOne));
routerCompeticiones
  .route("/userId/:id")
  .get(catchErrors(inscriptionControllers.findAllofOneUser));
routerCompeticiones
  .route("/opened/:id")
  .get(catchErrors(inscriptionControllers.findAllOpened));
routerCompeticiones.put(
  "/signup/:id",
  catchErrors(inscriptionControllers.SignUpOnCompetition)
);

module.exports = routerCompeticiones;
