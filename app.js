const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const hotelRoutes = require("./routes/meshotels");
const userRoutes = require("./routes/user");
const app = express();
const path = require("path");
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://papecheikh:passer123@cluster0.dsaogmp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/meshotels", hotelRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
