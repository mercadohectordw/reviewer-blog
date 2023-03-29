const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signUp = async(req, res) => {
  try{
    let {username, name, email, password} = req.body;
  
    let newUser = new User({
      username,
      name,
      email,
      password: await User.encryptPassword(password)
    });
  
    let savedUser = await newUser.save();
  
    let token = jwt.sign({id: savedUser._id}, process.env.JWT_KEY, {expiresIn: "30d"});
    res.status(200).send({message: "Usuario Creado", token: token});

  } catch (e) {
    res.status(400).send({message: "Algo salió mal", error: e.message});
  }
};

const signIn = async(req, res) => {
  try{
    let {email, password} = req.body;

    let userFound = await User.findOne({email: email});
    if(!userFound){
      return res.status(400).send({message: "Usuario no encontrado"});
    }
    let matchPassword = await User.comparePassword(password, userFound.password);
    if (!matchPassword){
      return res.status(401).json({message: "Contraseña invalida"});
    }

    let token = jwt.sign({id: userFound._id}, process.env.JWT_KEY, {expiresIn: "30d"});
    res.status(200).send({token: token});

  } catch (e) {
    res.status(500).send({message: "Algo salió mal", error: e.message});
  }
};

module.exports = {
  signUp,
  signIn,
};