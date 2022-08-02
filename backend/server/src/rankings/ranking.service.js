const { Router } = require("express");
const rankingControllers = require("./ranking.controllers");

const routerRankings = Router();

routerRankings.post("/", rankingControllers.createOne);
routerRankings.put("/:id", rankingControllers.updateOne);
routerRankings.get("/:id", rankingControllers.findOne);
routerRankings.delete("/:id", rankingControllers.deleteOne);

module.exports = routerRankings;
