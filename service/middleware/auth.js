import jwt from 'jsonwebtoken'
import User from "../models/User"
import Role from "../models/Role"

const verifyToken = async (req, res, next) => {
  //leer el token del header
  
  const token = req.header('x-auth-token')

  //revisar si no hay token
  if (!token) {
    return res.status(403).json({ msg: 'no hay token, permiso no valido' })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETA)
    req.userId = decoded.user.id
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "No user found" });
    next()
  } catch (error) {
    res.status(401).json({ msg: "token no valido" })
  }
  //validar el token
}

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Admin Role!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
}

module.exports = { isAdmin, verifyToken }