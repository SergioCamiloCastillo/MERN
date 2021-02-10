const bcrypt = require("bcryptjs");
const User = require("../models/User");
const saltRounds = 10;
const userCtrl = {};

userCtrl.signUp = (req, res) => {
  const user = new User(); //Instancia del modelo User
  const { name, lastname,email, password, repeatPassword } = req.body; //Treaemos los datos que vienen de la vista en html
  user.name=name;
  user.lastname=lastname;
  user.email = email; //La propiedad user.email que vienen del modelo se iguala o se asigna a email, que viene del html
  user.role = "Admin";
  user.active = true;
  if (!password || !repeatPassword) {
    res.status(404).send({
      message: "Las contraseñas son obligatorias",
    });
  } else {
    if (password !== repeatPassword) {
      res.status(404).send({
        message: "Claves no son iguales",
      });
    } else {
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) {
          res.status(500).send({
            message: "Error al encriptar la contraseña",
          });
        } else {
          user.password = hash;
          user.save((err, userStored) => {
            if (err) {
              res.status(500).send({
                message: "El usuario ya existe",
              });
            } else {
              if (!userStored) {
                res.status(400).send({
                  message: "Error al crear el usuario",
                });
              } else {
                res.status(200).send({
                  user: userStored,
                });
              }
            }
          });
        }
      });
    }
  }
};

module.exports = userCtrl;
