import jwt from 'jsonwebtoken'
import { userModel } from "../../models"
const verifyToken = (req, res, next) => {
    //leer el token del header
    const token = req.header('x-auth-token')

    //revisar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'no hay token, permiso no valido' })
    }

    try {
        const cifrado = jwt.verify(token, process.env.SECRETA)
        req.userId = cifrado.user.id
        next()
    } catch (error) {
        res.status(401).json({ msg: "token no valido" })
    }
    //validar el token
}

const isAdmin = (roles) => async (req, res, next) => {
     //leer el token del header
     try {
        const token = req.header('x-auth-token').split(" ").pop();
         //revisar si no hay token
         if (!token) {
             return res.status(409).json({ msg: 'no hay token, permiso no valido' })
     
         }

         const tokenData = jwt.verify(token, process.env.SECRETA)
         const userData = await userModel.findById(tokenData.user.id);
         if ([].concat(roles).includes(userData.role[0])) {
           next();
         } else {
            res.status(401).json({ msg: "no posee permisos" })
         }
     } catch (error) {
         res.status(401).json(error)
     }
}

module.exports = { isAdmin, verifyToken }