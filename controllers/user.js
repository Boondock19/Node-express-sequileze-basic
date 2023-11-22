const { response, request } = require("express");
const { createUser, updateUser } = require("../services/user.service");

const usuariosGet = (req, res = response) => {
  const { q, nombre, apikey } = req.query;

  res.json({
    msg: "get API - controlador",
    q,
    nombre,
    apikey,
  });
};

const usuariosPut = async (req, res = response) => {
  try {
    const id = req.params.id;

    const { name, email, password } = req.body;

    const updatedUser = await updateUser(id,  name, email, password );

    return res.status(201).json({ status: "success", user: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      msg: error.message,
    });
  };
};

const usuariosPost = async (req, res = response, next) => {
  const { name, email, password } = req.body;
  // console.log({name,email,password});

  await createUser(name, email, password)
    .then((user) => {
      return res
        .status(201)
        .json({ status: "success", user, tokenUser: req.user });
    })
    .catch((err) => {
      const errorMessage = err.message;

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
