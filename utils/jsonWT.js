const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;


// Funcion para crear un jwt en base a un payload
const generateJWT = (payload) => {
  const token = jwt.sign({ id: payload }, secretKey, { expiresIn: "3h" });

  return token;
};

module.exports = {
  generateJWT,
};
