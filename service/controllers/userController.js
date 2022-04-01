const { userModel } = require("../models");

//obtiene que usuario esta autenticado
const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select('-password')
    res.json({ user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'hubo un error' })
  }
}
module.exports = {getUser}