const express = require('express')
const route = express.Router()
const ContactController = require('../controllers/Contact.controller');
const guardAuth = require('./guardAuth');
const body = require('express').urlencoded({extended:true})

route.get('/contact',ContactController.getContactPage);
route.post('/contact',guardAuth.notAuth,body,ContactController.postContactPage);

module.exports=route