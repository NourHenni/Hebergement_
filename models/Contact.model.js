const mongoose = require('mongoose')


var schemaContact = mongoose.Schema({
    
    NOM_PRENOM:{ 
        type:String,
        required:true
      },
    email:{ 
          type:String,
          required:true
      },
    Sujet:{ 
          type:String,
          required:true
      },

    Description:{
         type:String,
         required:true
    }, 
    
})

var Contact=mongoose.model('contact',schemaContact)
var url="mongodb://localhost:27017/location"

exports.postContact=(NOM_PRENOM,email,Sujet,Description)=>
{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            let contact= new Contact ({
                NOM_PRENOM:NOM_PRENOM,
                email:email,
                Sujet:Sujet,
                Description:Description,
                
               
            })
            return contact.save()
 

        }).then((contact)=>{
            mongoose.disconnect()
            resolve('Contact  !')
        }).catch((err)=>{
            mongoose.disconnect()
            reject(err)
        })
        
}
)}