//rutas para autenticar usuarios

const express = require("express");
const router = express.Router();
const {login, register } = require("../controllers/authController");
const { checkDuplicateEmail } = require("../middleware/verifySignup")
const { validateRegister, validateLogin } = require('../validators/auth')

// logea un usuario
router.post("/login", validateLogin, login );
//crear un usario
router.post('/register', validateRegister, checkDuplicateEmail, register)

module.exports = router;

