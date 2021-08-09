const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Survey Schema
const MovieSchema = new Schema({

movieId: { type: Number, required: [true, "*Campo obrigatório!"] },
title: {type: String, required: [true, "*Campo obrigatório!"]},
genres: { type: String, required: [true, "*Campo obrigatório!"] },
imdbId: { type: Number, required: [true, "*Campo obrigatório!"] },
tmdbId: {type: Number, required: [true, "*Campo obrigatório!"]},
year: { type: Number, required: [true, "*Campo obrigatório!"] },
url_image: {type: String, required: [true, "*Campo obrigatório!"]},
  
}); 
const Movie = mongoose.model("movies", MovieSchema); // exportar Modelo_PI
module.exports = Movie;