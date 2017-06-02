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

//edit comment form
router.get("/merchants/:id/comments/:comment_id/edit", isLoggedIn, function(req, res){
Comment.findById(req.params.comment_id, function(err, thisComment){
    res.render("comments/edit", {merchant: req.params.id, comment: thisComment});
    });
 });

//put edit
router.put("/merchants/:id/comments/:comment_id",isLoggedIn, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("/merchants");
        }else{
            res.redirect("/merchants/" + req.params.id);
        }
    });
});

//delete form
router.delete("/merchants/:id/:comment_id", isLoggedIn, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
          res.redirect("/merchants/" + req.params.id);
      }else{
          res.redirect("/merchants/" + req.params.id);
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