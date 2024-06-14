const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var schemaAuth = mongoose.Schema({
  nom: { type: String, required: true },

  prenom: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  tel: { type: Number, required: true },
  password: { type: String, required: true },
});

var User = mongoose.model("user", schemaAuth);
var url = "mongodb://localhost:27017/location";

exports.registerModel = (nom, prenom, email, date, tel, password) => {
  //test email if exist
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((user) => {
        if (user) {
          mongoose.disconnect(), reject("Cette adresse email est déja utilisé");
        } else {
          const saltRounds = 10;
          const salt = bcrypt.genSaltSync(saltRounds);
          const hpassword = bcrypt.hashSync(password, salt);
          console.log(hpassword);
          return hpassword;
        }
      })
      .then((hpassword) => {
        let user = new User({
          nom: nom,
          prenom: prenom,
          email: email,
          date: date,
          tel: tel,
          password: hpassword,
        });
        console.log(hpassword);
        return user.save();
      })
      .then((user) => {
        mongoose.disconnect();
        resolve("compte crée !");
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.loginModel = (email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((user) => {
        if (user) {
          bcrypt
            .compare(password, user.password)
            .then((verif) => {
              if (verif) {
                mongoose.disconnect();
                resolve(user._id);
              } else {
                mongoose.disconnect();
                reject("Mot de passe incorrect");
              }
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          mongoose.disconnect();
          reject("Utilisateur introuvable");
        }
      });
  });
};
