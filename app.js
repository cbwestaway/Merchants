    // Including npm packages
var express = require("express"),
    app = express(),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    // Declaring Models
    Merchant = require("./models/merchants"),
    User = require("./models/user"),
    Comment = require("./models/comment"),
    // Declaring routes and method override
    merchantRoutes = require("./routes/merchants"),
    commentRoutes = require("./routes/comments"),
    authRoutes = require("./routes/authentication"),
    methodOverride = require("method-override"),
    // Seeding the db
    seedDB = require("./seeds");
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


