const { sequilize } = require(".");


const UserModel  = (sequilize,Sequilize) => {
    const User = sequilize.define('user', {
        name: {
            type: Sequilize.STRING,
            required: true,
            allowNull : false,
            unique: true
        },
        email: {
            type: Sequilize.STRING,
            required: true,
            allowNull : false,
            unique: true

        },
        password: {
            type: Sequilize.STRING,
            required: true,
            allowNull : false
        },
        status: {
            type: Sequilize.BOOLEAN,
            defaultValue: true,
            allowNull : false
        },
    })


    return User;
}

// Clase utilizada para manejar el getter y el setter de los usuarios para devolver al front
class UserPostReturn {
    constructor(id,name,email,password,status) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.status = status;
    }

    get() {
        return this;
    }

    getLogin() {
        const {id,name,email,status} = this;
        return {id,name,email,status}
    }
}

module.exports = {
    UserModel,
    UserPostReturn
}

