const { Router } = require("express");
const { catchErrors } = require("../../errors");
const rankingControllers = require("./ranking.controllers");

const routerRankings = Router();

routerRankings.post("/", catchErrors(rankingControllers.createOne));
routerRankings
  .route("/:id")
  .put(catchErrors(rankingControllers.updateOne))
  .get(catchErrors(rankingControllers.findOne))
  .delete(catchErrors(rankingControllers.deleteOne));
routerRankings
  .route("/competition/:id")
  .get(catchErrors(rankingControllers.findByCompetitionId));

module.exports = routerRankings;
