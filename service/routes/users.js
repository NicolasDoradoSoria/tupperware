//rutas para crear usuarios

const express = require('express')
const router = express.Router()
const { verifyToken, isAdmin } = require("../middleware/auth")
const {getUser, createUser } = require("../controllers/userController");
const { checkRolesExisted, checkDuplicateEmail, comparePasswords } = require('../middleware/verifySignup')
//obtiene el usuario autenticado
router.get('/',verifyToken, getUser)
router.post('/',[verifyToken, checkDuplicateEmail, comparePasswords, isAdmin, checkRolesExisted], createUser)


module.exports = router
