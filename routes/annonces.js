const express = require("express");
const route = express.Router();
const AnnonceController = require("../controllers/Annonce.controller");
route.get("/:id", AnnonceController.getOneAnnonceDetailsController);
module.exports = route;
