//rutas para autenticar usuarios

const express = require("express");
const router = express.Router();
const {login, register } = require("../controllers/authController");
const { checkDuplicateEmail } = require('../middleware/utils/verifySignup')
const { validateRegister, validateLogin } = require('../middleware/validators/auth')

router.post("/login", validateLogin, login );

//crear un usario
//api/usaurios
router.post('/register', validateRegister, checkDuplicateEmail, register)

module.exports = router;

