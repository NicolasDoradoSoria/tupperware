import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { UserRepo, RoleRepo } from "../repositories/Repository"
const userRepo = new UserRepo()
const roleRepo = new RoleRepo()

//login
export const login = async (req, res) => {
  //extrear el email y password
  const { email, password } = req.body;

  try {
    //revisar que sea un usuario registrado
    const user = await userRepo.get({ email },false)
    
    if (!user) return res.status(400).json({ msg: "el usuario no existe" });
    
    const correctPass = await bcryptjs.compare(password, user.password);
    
    if (!correctPass) return res.status(401).json({ msg: "password incorrecto" });

    //si todo es correcto crear y firmar el JWT
    const payload = { user: { id: user.id, role: user.role, } };

    //firmar el JWT
    jwt.sign(
      payload, process.env.SECRETA, { expiresIn: 36000, },
      (error, token) => {
        if (error) throw error;

        //mensaje de confirmacion
        res.json({ token, msg: "se a logeado correctamente" });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "hubo un error" });
  }
};

export const register = async (req, res) => {
  try {
    const { password, roles} = req.body

    let user = req.body

    //hashear el password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    if (roles) {
      const foundRoles = await roleRepo.get({ name: { $in: roles } })
      user.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await roleRepo.get({ name: "user" })
      user.roles = [role._id];
    }

    //guardar usuario
    const newUser = await userRepo.create(user)

    //crear y firmar el JWT
    const payload = { user: { id: newUser.id } };

    //firmar el JWT
    jwt.sign(payload, process.env.SECRETA, { expiresIn: 3600, },
      (error, token) => {
        if (error) throw error;

        //mensaje de confirmacion
        res.status(200).json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "hubo un error" });
  }
};

