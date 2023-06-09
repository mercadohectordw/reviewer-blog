const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  name: {type: String, required: true},
  email: {type: String, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email invalido'], required: true},
  password: {type: String, required: true},
  imageUrl: {type: String, default: 'https://files.catbox.moe/entoxi.jpg', required: true},
  bio: {type: String},
  permissions: {type: [String]},
},{
  timestamps: true,
  versionKey: false
});

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, reveivedPassword) => {
  return await bcrypt.compare(password, reveivedPassword);
};

module.exports = mongoose.model("User", userSchema);