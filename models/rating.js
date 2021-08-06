const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Survey Schema
const RatingSchema = new Schema({

userId: { type: Number, required: [true, "*Campo obrigatório!"] },
movieId: { type: Number, required: [true, "*Campo obrigatório!"] },
rating: {type: Number, required: [true, "*Campo obrigatório!"]},
timestamp: { type: Number, required: [true, "*Campo obrigatório!"] },

  
}); 
// criar Rating baseado em RatingSchema
const Rating = mongoose.model("ratings", RatingSchema); 
// exportar Rating
module.exports = Rating;