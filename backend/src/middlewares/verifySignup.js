const User = require('../models/User');

const checkExistingUser = async(req, res, next) => {
  try{
    const usernameFound = await User.findOne({username: req.body.username});
    
    const emailFound = await User.findOne({email: req.body.email});

    if(usernameFound || emailFound){
      return res.status(400).json({message: "El usuario ya existe"});
    }

    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({message: "Algo salió mal", error: e.message});
  }
};

module.exports = {
  checkExistingUser
}