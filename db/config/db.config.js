require('dotenv').config();

// Configuracion base necesaria para sequelize

module.exports = {
    HOST: process.env.HOST || "localhost",
    USER: process.env.USER || "boondock",
    PASSWORD: process.env.PASSWORD || "2839382",
    DB: process.env.DB || "sequilizeTest",
    dialect: "postgres"
}