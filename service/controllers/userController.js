const { userModel, roleModel } = require("../models");

//obtiene que usuario esta autenticado
const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select('-password')
    const roles = await roleModel.find({ _id: { $in: user.roles } })
    res.json({ user, roles })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'hubo un error' })
  }
}
module.exports = {getUser}