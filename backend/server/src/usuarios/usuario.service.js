const { Router } = require("express");
const userControllers = require("./usuario.controllers");

const routerUsuarios = Router();

routerUsuarios.post("/", userControllers.createOne);
routerUsuarios.put("/:id", userControllers.updateOne);
routerUsuarios.get("/:id", userControllers.findOne);
routerUsuarios.delete("/:id", userControllers.deleteOne);

module.exports = routerUsuarios;
