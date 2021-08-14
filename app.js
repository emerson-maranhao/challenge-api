const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

dotenv.config()

mongoose.Promise = global.Promise
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ei5bo.mongodb.net/MovieLensDB?retryWrites=true&w=majority`;

const connectionParams={ useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true}

mongoose.connect(url,connectionParams).then(() => {
    console.log(" MongoDB is connected!")
}).catch((err) => {
    console.log("Error to connect in MongoDB" + err)
})

const routes = require("./routes/router");
app.use("/api", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running!");
});

