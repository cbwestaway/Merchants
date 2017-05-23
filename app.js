var express = require("express");


              var app = express();
             var passport = require("passport");
             var LocalStrategy = require("passport-local");
               var  bodyParser = require("body-parser");
               var  mongoose = require("mongoose");
               var Merchant = require("./models/merchants");
               var User = require("./models/user");
               
               var merchantRoutes = require("./routes/merchants");
               var commentRoutes = require("./routes/comments");
               var authRoutes = require("./routes/authentication");
               var methodOverride = require("method-override");
             
var seedDB = require("./seeds");
var Comment = require("./models/comment");
//seedDB();

mongoose.connect("mongodb://localhost/banana");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

// Passport setUp
app.use(require("express-session")({
    secret: "lettuce lettuce lettuce",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    console.log("current user " + res.locals.currentUser);
    next();
});

app.use(merchantRoutes);
app.use(commentRoutes);
app.use(authRoutes);


// listen
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("works");
});


