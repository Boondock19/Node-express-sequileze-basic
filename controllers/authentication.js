const { request, response } = require("express");
const { loginUser } = require("../services/authentication.service");

const login = async (req = request, res = response) => {
  try {
    const { body } = req;
    

    //   servicio de login busca al user, compara la pw

    const { user, token } = await loginUser(body);

    return res.status(200).json({
      status: "success",
      user: user,
      token: token,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      msg: error.message,
    });
  }
};

const logout = async (req = request, res = response) => {
  return res.status(200).json({
    msg: "logout",
  });
};

module.exports = {
  login,
  logout,
};
