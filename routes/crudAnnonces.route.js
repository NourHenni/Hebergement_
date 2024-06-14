const AnnonceController = require("../controllers/Annonce.controller");
const express = require("express");
const route = express.Router();
const guardAuth = require("./guardAuth");
const multer = require("multer");

route.get("/ajoutAnnonce", guardAuth.isAuth, AnnonceController.getAddAnnonce);

route.post(
  "/ajoutAnnonce",
  multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "assets/img");
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      },
    }),
  }).single("photo"),
  AnnonceController.postAddAnnonce
);

module.exports = route;
