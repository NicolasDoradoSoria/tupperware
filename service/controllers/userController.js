import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { UserRepo, RoleRepo } from "../repositories/Repository"
const userRepo = new UserRepo()
const roleRepo = new RoleRepo()

//obtiene que usuario esta autenticado
export const getUser = async (req, res) => {
  try {
    const user = await userRepo.get({ _id: req.userId },true)
    res.json({ user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'hubo un error' })
  }
}

export const createUser = async (req, res) => {

  try {
    const { password, roles } = req.body;
    let user = req.body
    
    const rolesFound = await roleRepo.get({ name: { $in: roles } })
    user.roles = rolesFound.map((role) => role._id)
    
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
    // confirmamos si se creo correctamente
    if (!newUser) return res.json({ msg: "no se a podido crear el usuario" });

    //crear el JWT
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
}