const express = require("express");
const route = express.Router();
const AnnonceController = require("../controllers/Annonce.controller");
const guardAuth = require("./guardAuth");

route.get("/", AnnonceController.getMyAnnoncesPage);
route.post("/delete", AnnonceController.deleteAnnonceController);

module.exports = route;
