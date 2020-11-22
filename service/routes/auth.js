//rutas para autenticar usuarios

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth")
//iniciar secion//api/auth
router.post(
  "/",
  [
    check("email", "agrega un email valido").isEmail(),
  ],
  authController.authenticateUser
);

//obtiene el usuario autenticado
router.get('/',
auth,
authController.getUser
)
module.exports = router;
