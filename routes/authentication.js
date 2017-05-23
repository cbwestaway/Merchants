var express = require("express");
var router = express.Router({mergeParams: true});
var passport = require("passport");
var User = require("../models/user");


// landing page
router.get("/", function(req, res){
    res.render("landing");
});


// Sign In Routes

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register( newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/register");
        }
            passport.authenticate("local")(req, res, function(){
                res.redirect("/merchants");
            
        });
    });
});

router.get("/login", function(req, res){
    res.render("login");
});

//app.post("/login", middleware, callback)
router.post("/login", 
passport.authenticate("local", {successRedirect: "/merchants", failureRedirect: "/login"}), 
function(req, res){
    res.send("ugh");
});

// Logout
router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
});

//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//Export
module.exports = router;