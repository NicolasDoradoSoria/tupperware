//rutas para crear usuarios

const express = require('express')
const router = express.Router()
const { verifyToken, isAdmin } = require("../middleware/utils/auth")
const {getUser, createUser } = require("../controllers/userController");
const { checkRolesExisted, checkDuplicateEmail } = require('../middleware/utils/verifySignup');
//obtiene el usuario autenticado
router.get('/',verifyToken, getUser)
router.post('/',[verifyToken, checkDuplicateEmail, isAdmin, checkRolesExisted], createUser)


module.exports = router
