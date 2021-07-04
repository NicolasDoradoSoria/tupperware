const User = require("../models/User");
const Role = require("../models/Role");
const bcryptjs = require("bcryptjs");
const { validationResultFunction } = require("../libs/validationResult");
const jwt = require("jsonwebtoken");
exports.signUp = async (req, res) => {
  validationResultFunction(req)
  console.log(req.body)
  //extraer email y password
  try {
    console.log("holaaa")
    const {password, roles } = req.body;
    //crea el nuevo usuario
    user = new User(req.body);
    
    //hashear el password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);
    
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      user.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      user.roles = [role._id];
    }
    
    
    console.log(user)
    //guardar usuario
    await user.save();

    //crear y firmar el JWT
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
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        //mensaje de confirmacion
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    console.log("no funciiiiii");
    res.status(400).send("hubo un error");
  }
};
