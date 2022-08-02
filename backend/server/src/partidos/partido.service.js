const { Router } = require("express");
const matchControllers = require("./partido.controllers");

const routerPartidos = Router();

routerPartidos.post("/", matchControllers.createOne);
routerPartidos.put("/:id", matchControllers.updateOne);
routerPartidos.get("/:id", matchControllers.findOne);
routerPartidos.delete("/:id", matchControllers.deleteOne);

module.exports = routerPartidos;
