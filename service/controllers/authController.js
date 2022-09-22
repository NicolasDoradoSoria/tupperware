import Role from "../models/Role"
import User from '../models/User'

import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { matchedData } from "express-validator"

//login
export const login = async (req, res) => {
  //extrear el email y password
  const { email, password } = req.body;

  try {
    //revisar que sea un usuario registrado
    const user = await User.findOne({ email: email }).populate("roles");

    if (!user) {
      return res.status(400).json({ msg: "el usuario no existe" });
    }

    const correctPass = await bcryptjs.compare(password, user.password);

    if (!correctPass) {
      return res.status(401).json({ msg: "password incorrecto" });
    }

    //si todo es correcto crear y firmar el JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    //firmar el JWT
    jwt.sign(
      payload, process.env.SECRETA,
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


export const register = async (req, res) => {
  //extraer email y password
  try {
    const body = matchedData(req)
    const { password} = body;


    //crea el nuevo usuarioz
    let user = new User(body);

    //hashear el password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    if (req.body.roles) {
      const foundRoles = await Role.find({ name: { $in: req.body.roles } });
      user.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
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
        res.status(200).json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("hubo un error");
  }
};

