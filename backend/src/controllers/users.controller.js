const User = require('../models/User');

const getUser = async(req, res) => {
  let user = await User.findOne({username: req.params.username});

  res.status(200).send(user);
};

const getAll = async (req, res) => {
  let users = await User.find();

  res.status(200).send(users);
};

const updateUser = async(req, res) => {
  if(req.userData.username != req.params.username){
    return res.status(401).send({message: "No Autorizado"});
  }

  let {name, imageUrl, email} = req.body;
  await User.findOneAndUpdate({username: req.params.username}, {name:name, imageUrl: imageUrl, email: email});
  res.status(204).send({message: "Usuario Actualizado"});
};

const changePassword = async(req, res) => {
  if(req.userData.username != req.params.username){
    return res.status(401).send({message: "No Autorizado"});
  }

  let {password} = req.body;
  let hashed = User.encryptPassword(password);
  await User.findOneAndUpdate({username: req.params.username}, {password: hashed});
  res.status(204).send({message: "Contraseña Actualizada"});
};

const deleteUser = async(req, res) => {
  await User.findOneAndDelete({username: req.params.username});

  res.status(204).send({message: "Usuario Eliminado"});
};

module.exports = {
  getUser,
  getAll,
  updateUser,
  changePassword,
  deleteUser
};