const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const RatingSchema = new Schema({

userId: { type: Number, required: [true, "*Campo obrigatório!"] },
movieId: { type: Number, required: [true, "*Campo obrigatório!"] },
rating: {type: Number, required: [true, "*Campo obrigatório!"]},
timestamp: { type: Number, required: [true, "*Campo obrigatório!"] },

  
}); 
const Rating = mongoose.model("ratings", RatingSchema); 
module.exports = Rating;