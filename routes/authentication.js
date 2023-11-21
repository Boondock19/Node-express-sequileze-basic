

const {Router} = require('express')
const { login, logout } = require('../controllers/authentication')


const router = Router()

router.post('/login', login)


module.exports = router;