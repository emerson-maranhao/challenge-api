const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const MovieSchema = new Schema({

movieId: { type: Number, required: [true, "*Campo obrigatório!"] },
title: {type: String, required: [true, "*Campo obrigatório!"]},
genres: { type: String, required: [true, "*Campo obrigatório!"] },
imdbId: { type: Number, required: [true, "*Campo obrigatório!"] },
tmdbId: {type: Number, required: [true, "*Campo obrigatório!"]},
year: { type: Number, required: [true, "*Campo obrigatório!"] },
url_image: {type: String, required: [true, "*Campo obrigatório!"]},

overview: {type: String, required: [true, "*Campo obrigatório!"]},
original_title: {type: String, required: [true, "*Campo obrigatório!"]},
popularity: {type: Number, required: [true, "*Campo obrigatório!"]},

}); 
const Movie = mongoose.model("movies", MovieSchema); 
module.exports = Movie;