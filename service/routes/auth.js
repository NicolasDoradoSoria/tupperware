//rutas para autenticar usuarios

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { verifyToken } = require("../middleware/auth")
const { signin, getUser } = require("../controllers/authController");

router.post(
  "/signin",
  [
    check("email", "agrega un email valido").isEmail(),
  ],
  signin
);

//obtiene el usuario autenticado
router.get('/',
  verifyToken,
  getUser
)
module.exports = router;

