//rutas para autenticar usuarios

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const {verifyToken}= require("../middleware/auth")

router.post(
    "/signin",
    [
      check("email", "agrega un email valido").isEmail(),
    ],
    authController.signin
  );
  
  //obtiene el usuario autenticado
  router.get('/',
  verifyToken,
  authController.getUser
  )
  module.exports = router;

