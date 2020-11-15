//rutas para autenticar usuarios

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");
//crear un usario
//api/auth
router.post(
  "/",
  [
    check("email", "agrega un email valido").isEmail(),
  ],
  authController.authenticateUser
);

module.exports = router;
