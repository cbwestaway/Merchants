var mongoose = require("mongoose");
var Merchant = require("./models/merchants");
var Comment = require("./models/comment");

var data = [
    {name: "Antoinettes", image: "https://thumbs.dreamstime.com/t/banana-merchants-offer-his-stall-market-cepogo-boyolali-central-java-indonesia-32551772.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    {name: "Bluths", image: "http://vignette2.wikia.nocookie.net/arresteddevelopment/images/6/67/1x05_Charity_Drive_%2810%29.png/revision/latest/scale-to-width-down/670?cb=20120205003332",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."},
    { name: "Colin", image: "https://previews.123rf.com/images/breck/breck0611/breck061100019/635253-Brazilian-Banana-Stand-Stock-Photo.jpg", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
    ];

function seedDB(){
    // clear the database
    Merchant.remove({}, function(err){
    if(err){
        console.log(err);
    }
});

   // Add merchants
//   data.forEach(function(seed){
//       Merchant.create(seed, function(err, merchant){
//           if(err){
//               console.log(err);
//           }else{
//               console.log("merchant added");
//           }
//           //Add a comment
//           Comment.create(
//               {
//                   text:"Great place! No kiwis though :(",
//                   author: "Emily"
//               }, function(err, comment){
//                   if(err){
//                       console.log(err);
//                   }else{
//                       merchant.comments.push(comment);
//                       merchant.save();
//                       console.log("Comment Created");
//                   }
//               }
//               );
           
//       });
//   });
    
}

module.exports = seedDB;