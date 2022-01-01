const User = require("../models/userMode")

 const registration = async (req,res) => {
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) {
      return res.status(400).json({mess:"User already signin"})
    }
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password:req.body.password
    })
    try {
        const saveUser = await user.save()
        res.status(200).json({mess:"registration sucessfull",data:saveUser})
    } catch (error) {
        res.status(400).send("server err")
    }

}

module.exports = {
    registration
}