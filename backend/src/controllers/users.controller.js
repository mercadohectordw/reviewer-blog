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
  res.status(200).send({message: "Usuario Actualizado"});
};

const changePassword = async(req, res) => {
  if(req.userData.username != req.params.username){
    return res.status(401).send({message: "No Autorizado"});
  }

  let {password} = req.body;
  let hashed = await User.encryptPassword(password);
  await User.findOneAndUpdate({username: req.params.username}, {password: hashed});
  res.status(200).send({message: "Contraseña Actualizada"});
};

const givePermission = async(req, res) => {
  let new_permission = req.body.new_permission;
  if(new_permission != "admin" && new_permission != "autor") return res.status(400).send({message: "Rol no valido"});

  let user = await User.findOne({username: req.params.username});
  if(!user) return res.status(404).send({message: "Usuario no encontrado"});

  user.permissions.push(new_permission);
  await user.save();

  res.status(200).send({message: "Permiso asignado"});
};

const deletePermission = async(req, res) => {
  let permission = req.body.permission;

  let user = await User.findOne({username: req.params.username});
  if(!user) return res.status(404).send({message: "Usuario no encontrado"});

  user.permissions.splice(user.permissions.indexOf(permission), 1);
  await user.save();

  res.status(200).send({message: "Permiso borrado"});
};

const deleteUser = async(req, res) => {
  await User.findOneAndDelete({username: req.params.username});

  res.status(200).send({message: "Usuario Eliminado"});
};

module.exports = {
  getUser,
  getAll,
  updateUser,
  changePassword,
  givePermission,
  deletePermission,
  deleteUser
};