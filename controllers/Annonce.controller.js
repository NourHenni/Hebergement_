const AnnonceModel = require("../models/Annonce.model");

exports.getAllAnnonceController = (req, res) => {
  AnnonceModel.getAllAnnonces().then((annonces) => {
    res.render("annonces", {
      annonces: annonces,
      verifUser: req.session.userId,
    });
  });
};

exports.getMyAnnoncesPage = (req, res, next) => {
  AnnonceModel.getMyAnnonces(req.session.userId).then((annonces) => {
    res.render("MesAnnonces", {
      verifUser: req.session.userId,
      MesAnnonces: annonces,
    });
  });
};

exports.getAddAnnonce = (req, res) => {
  res.render("ajoutAnnonce", {
    verifUser: req.session.userId,
    Smessage: req.flash("Successmessage")[0],
    Emessage: req.flash("Errormessage")[0],
  });
  console.log(req.session.userId);
};
exports.getOneAnnonceDetailsController = (req, res, next) => {
  let id = req.params.id;
  AnnonceModel.getOneAnnoncesDetails(id).then((resannonce) => {
    res.render("details", {
      annonce: resannonce,
      verifUser: req.session.userId,
    });
  });
};

exports.postAddAnnonce = (req, res) => {
  console.log(req.body);
  console.log(req.file.filename);
  AnnonceModel.postDataAnnonceModel(
    req.body.titre,
    req.body.types,
    req.body.colocs,
    req.body.logement,
    req.body.piece,
    req.body.superficie,
    req.body.adresse,
    req.body.taille,
    req.body.date,
    req.body.montant,
    req.body.caution,
    req.body.email,
    req.body.tel,
    req.body.text,
    req.file.filename,
    req.body.sport,
    req.session.userId
  )
    .then((msg) => {
      req.flash("Successmessage", msg);
      console.log(msg);
      console.log(req.session.userId);
      res.redirect("/ajoutAnnonce");
    })
    .catch((err) => {
      console.log(err);
      req.flash("Errormessage", err);
      res.redirect("/ajoutAnnonce");
    });
};

exports.deleteAnnonceController = (req, res, next) => {
  let id = req.body.id;

  AnnonceModel.deleteAnnonce(id)
    .then((verif) => {
      console.log(verif);
      res.redirect("/MesAnnonces");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getMyAnnonceUpdatePage = (req, res, next) => {
  const verifUser = true;
  let id = req.query.id; // use req.query.id to extract id from query string
  AnnonceModel.getPageUpdateAnnonceModel(id)
    .then((annonce) => {
      if (!annonce) {
        res.render("error", {
          errorMessage: "Annonce not found",
        });
      } else {
        res.render("updateAnnonce", {
          Annonceupdate: annonce,
          verifUser: verifUser,
        });
      }
    })
    .catch((err) => {
      res.render("error", {
        errorMessage: err.message,
      });
    });
};

exports.postUpdateAnnonceContoller = (req, res, next) => {
  if (req.file) {
    AnnonceModel.postUpdateModel(
      req.body.titre,
      req.body.types,
      req.body.colocs,
      req.body.logement,
      req.body.piece,
      req.body.superficie,
      req.body.adresse,
      req.body.taille,
      req.body.date,
      req.body.montant,
      req.body.caution,
      req.body.email,
      req.body.tel,
      req.body.text,
      req.file.filename,
      req.body.sport,
      req.session.userId
    )
      .then((msg) => {
        req.flash("Successmessage", msg);
        res.redirect(`/updateAnnonce/${req.body.AnnonceID}`);
      })
      .catch((err) => {
        req.flash("Errormessage", err);
        res.redirect(`/updateAnnonce/${req.body.AnnonceID}`);
      });
  } else {
    AnnonceModel.postUpdateModel(
      req.body.AnnonceID,
      req.body.titre,
      req.body.types,
      req.body.colocs,
      req.body.logement,
      req.body.piece,
      req.body.superficie,
      req.body.adresse,
      req.body.taille,
      req.body.date,
      req.body.montant,
      req.body.caution,
      req.body.email,
      req.body.tel,
      req.body.text,
      req.body.oldImage,
      req.body.sport,
      req.session.userId
    )
      .then((msg) => {
        req.flash("Successmessage", msg);
        res.redirect(`/updateAnnonce/${req.body.AnnonceID}`);
      })
      .catch((err) => {
        req.flash("Errormessage", err);
        res.redirect(`/updateAnnonce/${req.body.AnnonceID}`);
      });
  }
};
