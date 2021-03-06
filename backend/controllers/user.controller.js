const bcrypt = require("bcryptjs");
const jwt = require("../services/jwt");
const User = require("../models/User");
const fs = require('fs');
const path = require("path");
const {
  exists
} = require("../models/User");
const saltRounds = 10;
const userCtrl = {};

userCtrl.signUp = (req, res) => {
  const user = new User(); //Instancia del modelo User
  const {
    name,
    lastname,
    email,
    password,
    repeatPassword
  } = req.body; //Treaemos los datos que vienen de la vista en html
  user.name = name;
  user.lastname = lastname;
  user.email = email.toLowerCase(); //La propiedad user.email que vienen del modelo se iguala o se asigna a email, que viene del html
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
      bcrypt.hash(password, saltRounds, function (err, hash) {
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
userCtrl.signIn = (req, res) => {
  const params = req.body;
  const email = params.email.toLowerCase();
  const password = params.password;
  User.findOne({
    email
  }, (err, userStored) => {
    if (err) {
      res.status(500).send({
        message: "Error del servidor",
      });
    } else {
      if (!userStored) {
        res.status(404).send({
          message: "Usuario no encontrado",
        });
      } else {
        bcrypt.compare(password, userStored.password, (err, check) => {
          if (err) {
            res.status(500).send({
              message: "Error del servidor."
            });
          } else if (!check) {
            res.status(404).send({
              message: "La contraseña es incorrecta."
            });
          } else {
            if (!userStored.active) {
              res
                .status(200)
                .send({
                  code: 200,
                  message: "El usuario no se ha activado."
                });
            } else {
              res.status(200).send({
                accessToken: jwt.createAccessToken(userStored),
                refreshToken: jwt.createRefreshToken(userStored),
              });
            }
          }
        });
      }
    }
  });
};
userCtrl.getUsers = (req, res) => {
  User.find().then((users) => {
    if (!users) {
      res.status(404).send({
        message: "No se ha encontrado ningun usuario",
      });
    } else {
      res.status(200).send({
        users
      });
    }
  });
};
userCtrl.getUsersActive = (req, res) => {
  const query = req.query;
  User.find({
    active: query.active
  }).then((users) => {
    if (!users) {
      res.status(404).send({
        message: "No se ha encontrado ningun usuario",
      });
    } else {
      res.status(200).send({
        users
      });
    }
  });
};
userCtrl.uploadAvatar = (req, res) => {
  const params = req.params;

  User.findById({
    _id: params.id
  }, (err, userData) => {
    if (err) {
      res.status(500).send({
        message: "Error del servidor."
      });
    } else {
      if (!userData) {
        res.status(404).send({
          message: "Nose ha encontrado ningun usuario."
        });
      } else {
        let user = userData;

        if (req.files) {
          let filePath = req.files.avatar.path;
          let fileSplit = filePath.split("/");
          let fileName = fileSplit[2];

          let extSplit = fileName.split(".");
          let fileExt = extSplit[1];

          if (fileExt !== "png" && fileExt !== "jpg") {
            res.status(400).send({
              message: "La extension de la imagen no es valida. (Extensiones permitidas: .png y .jpg)"
            });
          } else {
            user.avatar = fileName;
            User.findByIdAndUpdate({
                _id: params.id
              },
              user,
              (err, userResult) => {
                if (err) {
                  res.status(500).send({
                    message: "Error del servidor."
                  });
                } else {
                  if (!userResult) {
                    res
                      .status(404)
                      .send({
                        message: "No se ha encontrado ningun usuario."
                      });
                  } else {
                    res.status(200).send({
                      avatarName: fileName
                    });
                  }
                }
              }
            );
          }
        }
      }
    }
  });
}
userCtrl.getAvatar = (req, res) => {
  const avatarName = req.params.avatarName;
  const filePath = "./uploads/avatar/" + avatarName;
  fs.exists(filePath, exists => {
    if (!exists) {
      res.status(404).send({
        message: "El avatar que buscas no existe"
      })
    } else {
      res.sendFile(path.resolve(filePath))
    }
  });
}
userCtrl.updateUser = async (req, res) => {
  let userData = req.body;
  userData.email = req.body.email.toLowerCase();
  const params = req.params;

  if (userData.password) {
    await bcrypt.hash(userData.password, saltRounds, (err, hash) => {
      if (err) {
        res.status(500).send({
          message: "Error al encriptar la contraseña"
        });
      } else {
        let val_password = userData.password.indexOf("$2a$10") > -1;

        if (val_password == true) {

        } else {
          userData.password = hash;

        }
        User.findByIdAndUpdate({
          _id: params.id
        }, userData, (err, userUpdate) => {
          if (err) {
            res.status(500).send({
              message: "Error de servidor"
            });
          } else {
            if (!userUpdate) {
              res.status(404).send({
                message: "Usuario no encontrado"
              });
            } else {
              res.status(200).send({
                message: "Usuario actualizado correctamente"
              });
            }
          }
        });
      }
    });
  }
}
userCtrl.activateUser = (req, res) => {
  const {
    id
  } = req.params; //Lo que viene de la URL
  const {
    active
  } = req.body; //Lo que viene de un formulario 

  User.findByIdAndUpdate(id, {
    active
  }, (err, userStored) => {
    if (err) {
      res.status(500).send({
        message: "Error del servidor."
      });
    } else {
      if (!userStored) {
        res.status(404).send({
          message: "No se ha encontrado el usuario."
        });
      } else {
        if (active == true) {
          res.status(200).send({
            message: "Usuario activado correctamente."
          })
        } else {
          res.status(200).send({
            message: "Usuario desactivado correctamente."
          })
        }
      }
    }
  });


}
userCtrl.deleteUser = (req, res) => {
  const {
    id
  } = req.params;

  User.findByIdAndRemove(id, (err, userDeleted) => {
    if (err) {
      res.status(500).send({
        message: "Error de servidor"
      });
    } else {
      if (!userDeleted) {
        res.status(404).send({
          message: "Usuario no encontrado"
        })
      } else {
        res.status(200).send({
          message: "El usuario ha sido eliminado correctamente"
        })
      }
    }
  });

}
userCtrl.signUpAdmin = (req, res) => {
  const user = new User();
  const {
    name,
    lastname,
    email,
    role,
    password
  } = req.body;
  user.name = name;
  user.lastname = lastname;
  user.email = email.toLowerCase();
  user.role = role;
  user.active = true;
  if (!password) {
    res.status(500).send({
      message: "La contraseña es obligatoria."
    });
  } else {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        res.status(500).send({
          message: " Error al encriptar la contraseña."
        })
      } else {
        user.password = hash;
        user.save((err, userStored) => {
          if (err) {
            res.status(404).send({
              message: "No guardo, usuario ya existe"
            });
          } else {
            if (!userStored) {
              res.status(500).send({
                message: "Error el crear el nuevo usuario"
              })
            } else {
              res.status(200).send({
                message: "Usuario creado correctamente."
              })
            }
          }
        });
      }
    });
  }

}
module.exports = userCtrl;