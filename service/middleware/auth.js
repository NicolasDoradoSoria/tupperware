const jwt = require('jsonwebtoken')
const Role = require('../models/Role')
const User = require('../models/User')


exports.verifyToken  =  (req, res, next) =>{
    //leer el token del header
    const token = req.header('x-auth-token')

    //revisar si no hay token
    if(!token){
        return res.status(401).json({msg: 'no hay token, permiso no valido'})
    }

    try {
        const cifrado =  jwt.verify(token, process.env.SECRETA)
        req.userId = cifrado.id
        next()
    } catch (error) {
        res.status(401).json({msg: "token no valido"})
    }
    //validar el token
}


exports.isModerator  = async (req, res, next) =>{
  const user=  await User.findById(req.userId)
//   console.log(user)
  const roles =await Role.find({_id: {$in: user.roles}})
  for (let i = 0; i< roles.length; i++){
      if(roles[i].name === "moderator"){
          next()
          return
      }
  }

  return res.status(403).json({message: "requer moderetor role"})
}
exports.isAdmin  = async (req, res, next) =>{}
