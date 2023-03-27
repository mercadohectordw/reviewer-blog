const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {type: String, required: true},
  imageUrl: {type: String, default: 'https://files.catbox.moe/9ybo8z.png', required: true},
  content: {type: String, required: true},
  autor: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  tags: {type: [String]},
  hidden: {type: Boolean, default: 0, required: true}
},{
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model("Post", postSchema);