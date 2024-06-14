const ContactModel = require('../models/Contact.model');

exports.getContactPage=(req,res)=>{
    res.render('contact',{verifUser:req.session.userId});
}

exports.postContactPage=(req,res)=>{
    ContactModel.postContact(req.body.NOM_PRENOM,req.body.email,req.body.Sujet,req.body.Description).then((contact)=>{
        res.render('index',{verifUser:req.session.userId});
    }).catch((msg)=>
    {
      console.log(msg)
    })
    
}