const AuthModel = require("../models/auth.model");

exports.getregisterPage = (req, res) => {
  const errorMessage = req.flash("error")[0];
  delete req.session.flash;
  res.render("register", {
    verifUser: req.session.userId,
    message: errorMessage,
  });
};

exports.postRegisterData = (req, res) => {
  AuthModel.registerModel(
    req.body.nom,
    req.body.prenom,
    req.body.email,
    req.body.date,
    req.body.tel,
    req.body.password
  )
    .then((_user) => {
      /*if(req.body.password!== req.body.password2)
     { 
         errors.push({ msg:'passwords non compatible !'})

     }*/
      /*if(req.body.password.length < 6)
     {
         console.log({ msg : ' Au moins 6 caracters'})
     }*/

      res.redirect("/login");
    })
    .catch((msg) => {
      res.redirect("/register");
      console.log(msg);
    });
};

exports.getloginPage = (req, res) => {
  const errorMessage = req.flash("error")[0];
  delete req.session.flash;
  res.render("login", {
    verifUser: req.session.userId,
    message: errorMessage,
  });
};

exports.postLoginData = (req, res) => {
  AuthModel.loginModel(req.body.email, req.body.password)
    .then((id) => {
      req.session.userId = id;
      res.redirect("/");
    })
    .catch((msg) => {
      req.flash("error", msg);
      res.redirect("/login");
    });
};

exports.logoutFunction = (req, res) => {
  req.session.destroy(() => {
    res.cookie("connect.sid", "", { expires: new Date(0) }); // clear the cookie
    res.redirect("/login?loggedOut=true");
  });
};
