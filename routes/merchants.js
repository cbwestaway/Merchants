var express = require("express");
var router = express.Router();
var Merchant = require("../models/merchants");
var geoCoder = require("geocoder");


//merchants
router.get("/merchants", function(req, res){
    // Retrieving all merchants from the DB
    Merchant.find({}, function(err, merchants){
        if (err){
            console.log("db error");
        }
        else{
             res.render("merchants/index", {merchant: merchants});
        }
    });
});

// post merchants
router.post("/merchants", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author  = 
    {
        id: req.user._id,
        username: req.user.username
    };
    geoCoder.geocode(req.body.location, function(err, data){
        if(err){
            console.log("geoCode err" + err);
        }else{
            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;
            var location = data.results[0].formatted_address;

    var newMerchant = {name: name, image: image, description: desc, author: author, location: location, lat: lat, lng: lng};
    // add a campground
    Merchant.create(newMerchant, function(err, created){
        if(err){
            console.log("error" + err);
        }else{
            console.log("created: " + created);
            res.redirect("merchants");
        }
    });
        }
    });
});

// create merchant
router.get("/merchants/new", isLoggedIn, function(req, res) {
    res.render("merchants/new");
});

//edit merchant form
router.get("/merchants/:id/edit", isLoggedIn, function(req, res){
Merchant.findById(req.params.id, function(err, thisMerchant){
    res.render("merchants/edit", {merchant: thisMerchant});
    });
 });

//put edit
router.put("/merchants/:id",isLoggedIn, function(req, res){
    Merchant.findByIdAndUpdate(req.params.id, req.body.merchant, function(err, updatedMerchant){
        if(err){
            res.redirect("/merchants");
        }else{
            res.redirect("/merchants/" + req.params.id);
        }
    });
});

router.delete("/merchants/:id", isLoggedIn, function(req, res){
   Merchant.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/merchants");
       }else{
           res.redirect("/merchants");
       }
   }); 
});


// merchant show page
router.get("/merchants/:id", isLoggedIn, function(req, res){
    // finds campground with required id
    Merchant.findById(req.params.id).populate("comments").exec(function(err, foundMerchant){
        if(err){
            console.log(err);
        }else{
              res.render("merchants/show", {merchant: foundMerchant});
        }
    });
    
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