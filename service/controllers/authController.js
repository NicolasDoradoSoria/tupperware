import Role from "../models/Role"
import User from '../models/User'
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

//login
export const login = async (req, res) => {
  //extrear el email y password
  const { email, password } = req.body;

  try {
    //revisar que sea un usuario registrado
    const user = await User.findOne({ email: email }).populate("roles");

    if (!user)  return res.status(400).json({ msg: "el usuario no existe" });
    

    const correctPass = await bcryptjs.compare(password, user.password);

    if (!correctPass) return res.status(401).json({ msg: "password incorrecto" });


    //si todo es correcto crear y firmar el JWT
    const payload = {user: { id: user.id, role: user.role, }};

    //firmar el JWT
    jwt.sign(
      payload, process.env.SECRETA,{expiresIn: 36000, },
      (error, token) => {
        if (error) throw error;

        //mensaje de confirmacion
        res.json({ token, msg: "se a logeado correctamente" });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"hubo un error"});
  }
};

export const register = async (req, res) => {
  try {
    const { password, confirmPassword, firsName, lastName, email } = req.body

    // compara las dos contraseñas 
    if (password !== confirmPassword) return res.status(400).json({ msg: "las contraseñas no coinciden!" })

    // reviso si el email ya a sido registrado
    const userFound = await User.findOne({ email: req.body.email })
    if (userFound) return res.status(400).json({ msg: "el email ya existe" })

    // creamos un nuevo usuario
    let newUser = new User({ confirmPassword, firstName, lastName, email })

    //hashear el password
    const salt = await bcryptjs.genSalt(10);
    newUser.password = await bcryptjs.hash(password, salt);

    if (req.body.roles) {
      const foundRoles = await Role.find({ name: { $in: req.body.roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    //guardar usuario
    await newUser.save();

    //crear y firmar el JWT
    const payload = { user: { id: newUser.id } };

    //firmar el JWT
    jwt.sign( payload, process.env.SECRETA, { expiresIn: 3600,},
      (error, token) => {
        if (error) throw error;

        //mensaje de confirmacion
        res.status(200).json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"hubo un error"});
  }
};

