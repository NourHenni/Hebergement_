const HomeController = require("../controllers/home.controller");
const express = require("express");
const route = express.Router();

//route.get('/',HomeController.getAnnonceController)
route.get("/", HomeController.getAllAnnonceController);
module.exports = route;
