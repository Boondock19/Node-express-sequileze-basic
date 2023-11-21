const { response, request } = require("express");
const { createUser } = require("../services/user.service");

const usuariosGet = (req, res = response) => {
  const { q, nombre, apikey } = req.query;

  res.json({
    msg: "get API - controlador",
    q,
    nombre,
    apikey,
  });
};

const usuariosPut = (req, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "put API - controlador",
    id,
  });
};

const usuariosPost = async (req, res = response, next) => {
  const { name, email, password } = req.body;
  // console.log({name,email,password});

  await createUser(name, email, password)
    .then((user) => {
      return res.status(201).json({ status: "success", user, tokenUser: req.user });
    })
    .catch((err) => {
        const errorMessage = err.message
        console.log({errorMessage})
      return res.status(400).json({
        status: "error",
        msg: errorMessage,
      });
    });
};

const usuariosDelete = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    msg: "delete API - controlador",
    id,
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
