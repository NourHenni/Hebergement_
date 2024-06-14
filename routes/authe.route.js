const express = require("express");
const route = express.Router();
const AuthController = require("../controllers/auth.controller");
const guardAuth = require("./guardAuth");
const body = require("express").urlencoded({ extended: true });

route.get("/register", guardAuth.notAuth, AuthController.getregisterPage);
route.post("/register", body, AuthController.postRegisterData);

route.get("/login", guardAuth.notAuth, AuthController.getloginPage);
route.post("/login", body, AuthController.postLoginData);

route.post("/logout", AuthController.logoutFunction);

module.exports = route;
