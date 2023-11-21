const db = require("../db/models/index");
const User = db.users;
const Op = db.Sequilize.Op;
const {request,response} = require('express')
const jwt = require('jsonwebtoken');
const { UserPostReturn } = require("../db/models/user.model");

const secretKey = process.env.SECRET_KEY;

/**
 * 
    Funcion para validar un JWT y agregar informacion al request
 */
const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('alocha-token');

    if (!token) {
        return res.status(401).json({
            status: 'error',
            msg: 'No hay token en la petición'
        })
    }

    try {
        // Limpiamos el token
        const cleanToken = token.replace('Bearer ', '');

        // Tomamos el ID del payload
        const {id} =  jwt.verify(cleanToken, secretKey);
        console.log(id);
        //Buscamos al usuario en la DB

        const foundUser = await User.findOne({
            where: {
              id: id,
            },
          });

          if (!foundUser) {
            throw new Error("Usuario no encontrado");
          }


        const userCleaned = new UserPostReturn(
            foundUser.dataValues.id,
            foundUser.dataValues.name,
            foundUser.dataValues.email,
            foundUser.dataValues.password,
            foundUser.dataValues.status
          );
        
        // Agregamos el ID al request
        req.user = userCleaned;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: 'error',
            msg: 'Token no válido'
        })
    }

    
}


module.exports = {
    validarJWT
}