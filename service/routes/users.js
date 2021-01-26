//rutas para crear usuarios

const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const {check} = require('express-validator')
const {checkduplicateUsernameOrEmail} = require('../middleware/verifySignup')
//crear un usario
//api/usaurios
router.post('/signUp',
[
    check('firstName', 'el nombre es obligatorio').not().isEmpty(),
    check('lastName', 'el apellido es obligatorio').not().isEmpty(),
    check('email', 'agrega un email valido').isEmail(),
    check('password', 'el password debe ser minimo de 6 caracteres').isLength({min: 6}),
], checkduplicateUsernameOrEmail
 ,userController.signUp)

module.exports = router
