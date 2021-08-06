// associar as dependências instaladas
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// inicializar express
const app = express();

dotenv.config()

//Mongoose
mongoose.Promise = global.Promise
const url = `mongodb+srv://emerson:tottenham@cluster0.ei5bo.mongodb.net/MovieLensDB?retryWrites=true&w=majority`;

const connectionParams={
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true 
}

mongoose.connect(url,connectionParams).then(() => {
    console.log("Conectado ao Mongo")
}).catch((err) => {
    console.log("Erro ao conectar no MongoDB" + err)
})

// toda  url começa por ‘/api’ chama as rotas em ‘./routes/api’
const routes = require("./routes/router");
app.use("/api", routes);

// servidor local escuta a porta 3000
//process.env.PORT é a porta do Heroku
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running! " + PORT);
});

// commands
//https://www.youtube.com/watch?v=hx94qo26egk
// heroku login
// heroku apps:create movielensapp
// heroku git remote movielensapp
// git remote
// git push heroku main
// heroku open

