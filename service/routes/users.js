//rutas para crear usuarios

const express = require('express')
const router = express.Router()
const { verifyToken } = require("../middleware/auth")
const {getUser } = require("../controllers/userController");

//obtiene el usuario autenticado
router.get('/',verifyToken, getUser)

module.exports = router
