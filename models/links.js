const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const LinkSchema = new Schema({

movieId: { type: Number, required: [true, "*Campo obrigatório!"] },
imdbId: { type: Number, required: [true, "*Campo obrigatório!"] },
tmdbId: {type: Number, required: [true, "*Campo obrigatório!"]},
  
});
 // criar Modelo_PI baseado em PISchema: 
const Link = mongoose.model("links", LinkSchema); 
// exportar Link
module.exports = Link;