const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let cors = require("cors");
const { API_VERSION } = require("./config");

//Cargar rutas
const userRoutes = require("./routes/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Configuracion header http

//Rutas basicas
app.use(`/api/${API_VERSION}`, userRoutes);

module.exports = app;
