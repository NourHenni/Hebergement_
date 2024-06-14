const express = require("express");
const route = express.Router();
const router = require("./authe.route");
//const router = require('./authe.route')
const AnnonceController = require("../controllers/Annonce.controller");
const guardAuth = require("./guardAuth");
const multer = require("multer");

route.get("/", AnnonceController.getAllAnnonceController);

//route.get('/',AnnonceController.getMyAnnonces)
module.exports = route;
