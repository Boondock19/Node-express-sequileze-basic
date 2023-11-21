const db = require("../db/models/index");
const User = db.users;
const Op = db.Sequilize.Op;
const { comparePassword } = require("../utils/passwordEncrypt");
const { generateJWT } = require("../utils/jsonWT");
const { UserPostReturn } = require("../db/models/user.model");

const loginUser = async (body) => {
  // buscamos al user en la db
  // comparamos la pw
  // generamos el token
  // retornamos el token

  if (!body.email || !body.password)
    throw new Error("No se ingreso el email o la contraseña");

  try {
    const foundUser = await User.findOne({
      where: {
        email: body.email,
      },
    });

    console.log({ foundUser });

    if (!foundUser) {
      throw new Error("Email o contraseña incorrectos");
    }

    const userLoginResponse = new UserPostReturn(
      foundUser.dataValues.id,
      foundUser.dataValues.name,
      foundUser.dataValues.email,
      foundUser.dataValues.password,
      foundUser.dataValues.status
    );

    const passwordMatch = comparePassword(
      body.password,
      foundUser.dataValues.password
    );
    console.log({ passwordMatch });

    if (!passwordMatch) {
      throw new Error("Email o contraseña incorrectos");
    }

    const token = generateJWT(foundUser.id);

    return {
      user: userLoginResponse.getLogin(),
      token,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

module.exports = {
  loginUser,
};
