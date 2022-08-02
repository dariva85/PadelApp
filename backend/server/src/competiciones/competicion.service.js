const { Router } = require("express");
const competitionControllers = require("./competicion.controllers");

const routerCompeticiones = Router();

routerCompeticiones.post("/", competitionControllers.createOne);
routerCompeticiones.put("/:id", competitionControllers.updateOne);
routerCompeticiones.get("/:id", competitionControllers.findOne);
routerCompeticiones.delete("/:id", competitionControllers.deleteOne);

module.exports = routerCompeticiones;
