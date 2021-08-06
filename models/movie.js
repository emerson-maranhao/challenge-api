const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Survey Schema
const MovieSchema = new Schema({

movieId: { type: Number, required: [true, "*Campo obrigatório!"] },
title: {type: String, required: [true, "*Campo obrigatório!"]},
genres: { type: String, required: [true, "*Campo obrigatório!"] },
  
}); 
const Movie = mongoose.model("movies", MovieSchema); // exportar Modelo_PI
module.exports = Movie;