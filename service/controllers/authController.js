const User = require("../models/User");
const Role = require("../models/Role");
const Cart = require("../models/Cart");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResultFunction } = require("../libs/validationResult");
//sigin
exports.signin = async (req, res) => {

  validationResultFunction(req)


  //extrear el email y password

  const { email, password } = req.body;

  try {
    //revisar que sea un usuario registrado
    const user = await User.findOne({ email: email }).populate(
      "roles"
    );

    if (!user) {
      return res.status(400).json({ msg: "el usuario no existe" });
    }

    const correctPass = await bcryptjs.compare(password, user.password);
    if (!correctPass) {
      return res.status(400).json({ msg: "password incorrecto" });
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
    const user = await User.findById(req.userId).select('-password')
    const roles =await Role.find({_id: {$in: user.roles}})
    res.json({user, roles})
  } catch (error) {
    console.log(error)
    res.status(500).json({msg:'hubo un error'})
  }
}

