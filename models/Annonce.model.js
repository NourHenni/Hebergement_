const mongoose = require("mongoose");

const schemaAnnonce = mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  types: {
    type: String,
    required: true,
  },
  colocs: {
    type: String,
    required: true,
  },

  logement: {
    type: String,
    required: true,
  },
  piece: {
    type: String,
    required: true,
  },
  superficie: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  taille: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  montant: {
    type: String,
    required: true,
  },
  caution: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  sport: {
    type: String,
    required: true,
  },
  userId: String,
});

var Annonce = mongoose.model("annonce", schemaAnnonce);
var url = "mongodb://localhost:27017/location";

exports.postDataAnnonceModel = (
  titre,
  types,
  colocs,
  logement,
  piece,
  superficie,
  adresse,
  taille,
  date,
  montant,
  caution,
  email,
  tel,
  text,
  photo,
  sport,
  userId
) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        let annonce = new Annonce({
          titre: titre,
          types: types,
          colocs: colocs,
          logement: logement,
          piece: piece,
          superficie: superficie,
          adresse: adresse,
          taille: taille,
          date: date,
          montant: montant,
          caution: caution,
          email: email,
          tel: tel,
          text: text,
          photo: photo,
          sport: sport,
          userId: userId,
        });
        return annonce.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve("ajout réussi !");
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
exports.getAllAnnonces = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return Annonce.find({});
      })
      .then((annonces) => {
        mongoose.disconnect();
        resolve(annonces);
      })
      .catch((err) => reject(err));
  });
};

exports.getMyAnnonces = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return Annonce.find({ userId: userId });
      })
      .then((annonces) => {
        mongoose.disconnect();
        resolve(annonces);
      })
      .catch((err) => reject(err));
  });
};
exports.getOneAnnoncesDetails = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return Annonce.findById(id);
      })
      .then((annonces) => {
        mongoose.disconnect();
        resolve(annonces);
      })
      .catch((err) => reject(err));
  });
};

exports.deleteAnnonce = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return Annonce.deleteOne({ _id: id });
      })
      .then((annonces) => {
        mongoose.disconnect();
        resolve(true);
      })
      .catch((err) => reject(err));
  });
};

exports.getPageUpdateAnnonceModel = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return Annonce.findById(id);
      })
      .then((annonces) => {
        mongoose.disconnect();
        resolve(annonces);
      })
      .catch((err) => reject(err));
  });
};

exports.postUpdateModel = (
  AnnonceID,
  titre,
  types,
  colocs,
  logement,
  piece,
  superficie,
  adresse,
  taille,
  date,
  montant,
  caution,
  email,
  tel,
  text,
  filename,
  sport,
  userId
) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return Annonce.updateOne(
          { _id: AnnonceID },
          {
            titre: titre,
            types: types,
            colocs: colocs,
            logement: logement,
            piece: piece,
            superficie: superficie,
            adresse: adresse,
            taille: taille,
            date: date,
            montant: montant,
            caution: caution,
            email: email,
            tel: tel,
            text: text,
            photo: filename,
            sport: sport,
            userId: userId,
          }
        );
      })
      .then(() => {
        mongoose.disconnect();
        resolve("Updated!");
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
