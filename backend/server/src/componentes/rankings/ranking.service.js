const { Router } = require("express");
const rankingControllers = require("./ranking.controllers");

const routerRankings = Router();

routerRankings.post("/", rankingControllers.createOne);
routerRankings
  .route("/:id")
  .put(rankingControllers.updateOne)
  .get(rankingControllers.findOne)
  .delete(rankingControllers.deleteOne);

module.exports = routerRankings;
