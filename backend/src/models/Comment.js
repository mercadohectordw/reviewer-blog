const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  post: {type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true},
  parentComment: {type: mongoose.Schema.Types.ObjectId, ref: "Comment"},
  replies: {type: [mongoose.Schema.Types.ObjectId], ref: "Comment"},
  content: {type: String, required: true},
  hidden: {type: Boolean, default: 0, required: true}
},{
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model("Comment", commentSchema);