const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
exports.createUser = async (req, res) => {
  //revisar si hay errores
  console.log(req)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //extraer email y password
  const { email, password } = req.body;
  try {
    // revisar que el usauirio registrado sea unico
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "el usuario ya existe" });
    }

    //crea el nuevo usuario
    user = new User(req.body);
    //hashear el password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    //guardar usuario
    await user.save();

    //crear y firmar el JWT
    const payload = {
        user:{
            id: user.id
        }
    };

    //firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        //mensaje de confirmacion
        res.json({ token});
      }
    );

  } catch (error) {
    console.log(error);
    res.status(400).send("hubo un error");
  }
};
