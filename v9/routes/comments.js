var express = require("express");
var router = express.Router();
var Merchant = require("../models/merchants");
var Comment = require("../models/comment");

// Comments Routes
router.get("/merchants/:id/comments/new", isLoggedIn, function(req, res){
    //search for merchants
    Merchant.findById(req.params.id, function(err, merchant){
        if(err){
            console.log(err);
            res.redirect("/merchants");
        }else{
            res.render("comments/new", {merchant: merchant});
                }
    });
});

router.post("/merchants/:id", isLoggedIn,  function(req, res){
        //search for merchants
    Merchant.findById(req.params.id, function(err, merchant){
        if(err){
            console.log(err);
        }else{
             Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    merchant.comments.push(comment);
                    merchant.save();
                    res.redirect("/merchants/" + merchant._id);
        }
             });
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