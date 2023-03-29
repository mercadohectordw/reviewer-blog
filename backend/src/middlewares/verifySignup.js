const User = require('../models/User');

const checkExistingUser = async(req, res, next) => {
  try{
    const usernameFound = await User.findOne({username: req.body.username});
    
    const emailFound = await User.findOne({email: req.body.email});

    if(usernameFound) throw new Error("El nombre de usuario ya está ocupado");
    if(emailFound) throw new Error("El email ya está registrado");
    if(req.body.password.length < 8 || req.body.password.length > 16) throw new Error('Contraseña invalida');

    next();
  } catch (e) {
    res.status(400).json({message: "Algo salió mal", error: e.message});
  }
};

module.exports = {
  checkExistingUser
};