const { where } = require("sequelize");
const db = require("../db/models/index");
const User = db.users;
const Op = db.Sequilize.Op;
const { UserPostReturn } = require("../db/models/user.model");
const {
  passwordEncrypt,
  comparePassword,
} = require("../utils/passwordEncrypt");

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

const updateUser = async (id, UserName, UserEmail, UserPassword) => {
  /**
   * Esta funcion de actualizar usuario esta libre es decir,
   * un usurio puede actualizar a otro usuario, lo normal seria que
   * hubieran usuarios con rol administrador que tuvieran la capacidad
   * de hacerlo. Otra idea seria que solo el usuario que envia la peticion
   * sea el que deba actualizar sus datos, es decir, hay que verificar que el id
   * del jwt sea el mismo que el id del usuario que se quiere actualizar.
   */
  try {
    if (!id) {
      throw new Error("Id is required");
    }

    // obtener al usurio por id

    const foundUser = await User.findByPk(id);

    if (!foundUser) {
      throw new Error("User not found");
    }

    // actualizar al usuario
    // primero debemos encryptar la nueva contraseña
    const encryptedPassword = passwordEncrypt(UserPassword);


    foundUser.name = UserName;
    foundUser.email = UserEmail;
    foundUser.password = encryptedPassword;

    await foundUser.save()


    // if (!updatedUser) {
    //   throw new Error("Error al actualizar el usuario");
    // }

    // Crear la clase para la respuesta

    const responseUser = new UserPostReturn(
      foundUser.dataValues.id,
      foundUser.dataValues.name,
      foundUser.dataValues.email,
      foundUser.dataValues.password,
      foundUser.dataValues.status
    );

    return responseUser;
  } catch (err) {
    // pasamos el error al controlador para que lo maneje
    console.log(err);
    if (err.name === "SequelizeUniqueConstraintError") {
      throw new Error("El email o usuario ya existe");
    }
    throw new Error(err.message);
  }
};

module.exports = {
  createUser,
  updateUser,
};
