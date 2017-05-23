var mongoose = require("mongoose");

// Schema Setup
var merchantSchema = new mongoose.Schema({
    name: String,
    image: String,
    location: String,
    lat: Number,
    lng: Number,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "commentSchema"
        }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            },
            username: String
    }
});

module.exports =  mongoose.model("Merchant", merchantSchema);
