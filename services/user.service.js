const db = require("../db/models/index");
const User = db.users;
const Op = db.Sequilize.Op;
const { UserPostReturn } = require("../db/models/user.model");
const { passwordEncrypt, comparePassword } = require("../utils/passwordEncrypt");

const createUser = async (name, email, password) => {
  try {
    // IMPLEMENTAR EXPRESS-VALIDATORS

    const user = {
      name,
      email,
      password,
    };

    // Encrptacion de la contraseñas
    const encryptedPassword = passwordEncrypt(user.password);



    const newUser = await User.create({
      name: user.name,
      email: user.email,
      password: encryptedPassword,
    });

    if (!newUser) {
      throw new Error("Error al crear el usuario");
    }

    // No le gusta la destructuracion de objetos

    const newUserPostResponse = new UserPostReturn(
      newUser.dataValues.id,
      newUser.dataValues.name,
      newUser.dataValues.email,
      newUser.dataValues.password,
      newUser.dataValues.status
    );

    return newUserPostResponse;
  } catch (err) {
    // console.log(err);
    // pasamos el error al controlador para que lo maneje
    if (err.name === "SequelizeUniqueConstraintError") {
      throw new Error("El email o usuario ya existe");
    }
    throw new Error("Error al crear el usuario");
  }
};

module.exports = {
  createUser,
};
