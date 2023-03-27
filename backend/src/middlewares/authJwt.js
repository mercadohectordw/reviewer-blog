const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = (req, res, next) => {
  let authHeader = req.headers.authorization;

  if(!authHeader) return res.status(403).send({message: "Token no provisto"});
  if(!authHeader.toLowerCase().includes("bearer ")) return res.status(403).send({message: "Token invalido"});

  try{
    let token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, async(err, user) => {
      if(err) return res.status(403).send({message: "Token invalido"});
      
      let userData = await User.findById(user.id, "_id username email permissions");
      if(!userData) return res.status(404).send({message: "Usuario no encontrado"});

      req.userData = userData;
      next();
    });

  } catch (e) {
    return res.status(401).send({message: "No Autorizado"});
  }
};

const isAdmin = (req, res, next) => {
  if(!req.userData.permissions.includes("admin")) return res.status(401).send({message:"No Autorizado"});
  
  next();
};

const isAutor = (req, res, next) => {
  if(!req.userData.permissions.includes("autor")) return res.status(401).send({message:"No Autorizado"});
  
  next();
};

const isAutorOrAdmin = (req, res, next) => {
  if(!req.userData.permissions.includes("autor") && !req.userData.permissions.includes("admin")) return res.status(401).send({message:"No Autorizado"});
  
  next();
};

module.exports = {
  verifyToken,
  isAdmin,
  isAutor,
  isAutorOrAdmin
};