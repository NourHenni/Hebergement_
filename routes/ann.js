const express = require("express");
const route = express.Router();
const multer = require("multer");
const AnnonceController = require("../controllers/Annonce.controller");

route.get("/updateAnnonce", AnnonceController.getMyAnnonceUpdatePage);

route.post(
  "/updateAnnonce",
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
  AnnonceController.postUpdateAnnonceContoller
);

module.exports = route;
