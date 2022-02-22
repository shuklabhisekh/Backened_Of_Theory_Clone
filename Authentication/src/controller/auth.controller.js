require("dotenv").config();

 const jwt = require("jsonwebtoken") 
const User = require("../models/user.model");

const newToken = (user) => {

    // console.log(process.env);
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY);

}

const register = async (req, res) => {
    try {

        let user = await User.findOne({email:req.body.email}).lean().exec()
       
        if (user) {
            return res.status(500).send({message:"Invalid email or password"})
        }

        user = await User.create(req.body);

        const token = newToken(user);
       
        res.send({ user, token });
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).send({message:"Invalid email or password"})
        }

        const match = req.body.password;

        if (!match) {
            return res.status(400).send({ message: "Invalid email or password" });
        }

        const token = newToken(user);
       
        res.send({ user, token });

        
    }
    catch (e) {
        return res.status.send(e.message);
    }
}

module.exports = { register, login };