const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authenticateUser = async (req, res) => {
  //revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //extrear el email y password

  const { email, password } = req.body;

  try {
    //revisar que sea un usuario registrado
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "el usuario no existe" });
    }

    const correctPass = await bcryptjs.compare(password, user.password);
    if (!correctPass) {
      return res.status(400).json({ msg: "password incorrectp" });
    }

    //si todo es correcto crear y firmar el JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    //firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 36000,
      },
      (error, token) => {
        if (error) throw error;

        //mensaje de confirmacion
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

 //obtiene que usuario esta autenticado

 exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json({user})
  } catch (error) {
    console.log(error)
    res.status(500).json({msg:'hubo un error'})
  }
}
