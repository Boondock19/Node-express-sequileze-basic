



const bcrypt = require('bcrypt');
// Funcion para encriptar la contraseña
const passwordEncrypt = (password) => {
    const saltRounds = 10;

    const salt = bcrypt.genSaltSync(saltRounds);
    const passwordHash = bcrypt.hashSync(password, salt);

    return passwordHash;

}

// Funcion para comparar la contraseña ingresada con la contraseña encriptada
// retorna un valor booleano true si son iguales, false si no lo son
const comparePassword = (password, passwordHash) => {
    return bcrypt.compareSync(password, passwordHash);
}

module.exports = {
    passwordEncrypt,
    comparePassword
}
