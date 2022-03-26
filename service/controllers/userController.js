const { userModel, roleModel } = require("../models");
const bcryptjs = require("bcryptjs");
const { validationResultFunction } = require("../libs/validationResult");
const jwt = require("jsonwebtoken");
const signUp = async (req, res) => {
  validationResultFunction(req)
  //extraer email y password
  try {
    const {password, roles } = req.body;
    //crea el nuevo usuario
    user = new userModel(req.body);
    
    //hashear el password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);
    
    if (roles) {
      const foundRoles = await roleModel.find({ name: { $in: roles } });
      user.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await roleModel.findOne({ name: "user" });
      user.roles = [role._id];
    }
    
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
    res.status(400).send("hubo un error");
  }
};

module.exports = {signUp}