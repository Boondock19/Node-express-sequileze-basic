require('dotenv').config()

const express = require('express')
const cors = require('cors')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.usuariosPath = '/api/users'
        this.authPath = '/api/auth'
        this.db = require('../db/models/index')
        // Middlewares
        this.middlewares()
        // Rutas de mi aplicación
        this.routes()
    }

    middlewares() {
        // CORS
        this.app.use(cors())

        //Se llama a la funcion que conecta la base de datos

        this.dataBase()
        // Lectura y parseo del body
        this.app.use(express.json())

        // Lectura y parseo de body con request del tipo x-www-form-urlencoded
        this.app.use(express.urlencoded({extended: true}))

        // Directorio público
        this.app.use(express.static('public'))
    }

    async dataBase() {
       await this.db.sequilize.sync().
        then(() => {
            console.log('Db conectada')
        }).catch((err) => {
            console.log(err)
        
        })
    }

    routes()  {
       this.app.use(this.usuariosPath,require('../routes/user'))
       this.app.use(this.authPath,require('../routes/authentication'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
          })
    }

} 

module.exports = Server;