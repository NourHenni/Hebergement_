const express = require("express");
const path = require("path");
const routeAuth = require("./routes/authe.route");
const routeAnnonce = require("./routes/Annonce.route");
const routeContact = require("./routes/contact.route");
const routeAllAnnonce = require("./routes/MyAnnonces");
const CrudRoute = require("./routes/crudAnnonces.route");
const routeHome = require("./routes/home.route");
const routeAbout = require("./routes/about.route");
const details = require("./routes/annonces");
const route = require("./routes/ann");
const app = express();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

/*
var url='mongodb://localhost:27017/TEST'
app.get('/', (req, res) => {
 mongo.connect(url,(err,result)=>{
   if(err) throw err
   var db=result.db('TEST')
   db.createCollection('users',(err,result)=>{
    if(err) throw err
    else console.log('collection created')
   })
 })
})*/
app.use(express.static(path.join(__dirname, "assets"), { type: "text/css" }));

app.use(express.static(path.join(__dirname, "assets")));
app.set("view engine", "ejs");
app.set("views", "views");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var Store = new MongoDBStore({
  uri: "mongodb://localhost:27017/location",
  collection: "login",
});
app.use(flash());

app.use(
  session({
    secret: "This is a secret",
    store: Store,
    // Boilerplate options, see:
    // * https://www.npmjs.com/package/express-session#resave
    // * https://www.npmjs.com/package/express-session#saveuninitialized
    resave: true,
    saveUninitialized: false,
    cookie: {
      // Session expires after 15 min of inactivity.
      expires: 1800000,
    },
  })
);

app.use("/", routeAuth);
app.use("/", routeHome);
app.use("/", routeContact);
app.use("/", routeAbout);
app.use("/annonces", routeAnnonce);
app.use("/MesAnnonces", routeAllAnnonce);
app.use("/", CrudRoute);
app.use("/", route);
app.use("/", details);
/*app.get('/', (req,res) => {
  res.render('index',{verifUser:req.session.userId})

})*/

/*
app.get('/MyAnnonces', (req, res) => {
  res.render('MyAnnonces',{verifUser:req.session.userId})
})

app.get('/region', (req, res) => {
  res.render('region')
})



app.get('/login', (req, res) => {
  res.render('login')
})
app.get('/register', (req, res) => {
  res.render('register')
})*/

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
