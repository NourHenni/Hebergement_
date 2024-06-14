const AnnonceModel = require("../models/Annonce.model");

exports.getAllAnnonceController = (req, res) => {
  AnnonceModel.getAllAnnonces().then((annonces) => {
    res.render("index", {
      annonces: annonces,
      verifUser: req.session.userId,
    });
  });
};
