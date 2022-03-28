//rutas para autenticar usuarios

const express = require("express");
const router = express.Router();
const {login, register } = require("../controllers/authController");
const { checkduplicateUsernameOrEmail } = require('../middleware/verifySignup')
const { validateRegister, validateLogin } = require('../middleware/validators/auth')

router.post("/login", validateLogin, login );

//crear un usario
//api/usaurios
router.post('/register', validateRegister, checkduplicateUsernameOrEmail, register)

module.exports = router;

