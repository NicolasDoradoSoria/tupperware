const User = require("../models/User")

exports.checkduplicateUsernameOrEmail = async (req, res, next) => {
    const email = await User.findOne({email: req.body.email})
    if(email) return res.status(400).json({message: "the email already exists"})
    next()
}