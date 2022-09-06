import Role from '../models/Role'
import User from '../models/User'
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

//obtiene que usuario esta autenticado
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    res.json({ user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'hubo un error' })
  }
}

export const createUser = async (req, res) => {

  try {
    const { password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    //crea el nuevo usuarioz
    let user = new User({ ...req.body, roles: rolesFound.map((role) => role._id) });

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
}