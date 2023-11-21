const dbConfig = require("../config/db.config.js");
const {UserModel} = require("./user.model.js"); 

/**
 * ARCHIVO destinado a la configuracion de la base de datos y la conexion a la misma
 * en este archivo se agregan los modelos (tablas) que se crean en la base de datos
 * y se exportan para poder ser utilizados en el resto de la aplicacion
 */
const Sequilize = require("sequelize");

const sequilize = new Sequilize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
})


const db = {};

db.Sequilize = Sequilize; 
db.sequilize = sequilize;

// db.users = require("./user.model.js")(sequilize,Sequilize); 
db.users = UserModel(sequilize,Sequilize);


module.exports = db;