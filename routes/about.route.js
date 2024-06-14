const express = require("express");
const route = express.Router();
const AboutController = require("../controllers/about.controller");

route.get("/about", AboutController.getPageAbout);

module.exports = route;
