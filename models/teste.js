const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Survey Schema
const TesteSchema = new Schema({

userId: { type: Number, required: [true, "*Campo obrigatório!"] },
movieId: { type: Number, required: [true, "*Campo obrigatório!"] },
rating: {type: Number, required: [true, "*Campo obrigatório!"]},
timestamp: { type: Number, required: [true, "*Campo obrigatório!"] },

  
}); 
// criar Rating baseado em RatingSchema
const Teste = mongoose.model("testes", TesteSchema); 
// exportar Rating
module.exports = Teste;