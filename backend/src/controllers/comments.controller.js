const Comment = require('../models/Comment');

const getCommentsByUser = async(req, res) => {
  let comments = await Comment.find({autor: req.params.user_id})
    .sort({createdAt:-1})
    .limit(10)
    .populate("post", "title imageUrl");

  res.status(200).send(comments);
};

const getCommentsByPost = async(req, res) => {
  let comments = await Comment.find({post: req.params.post_id})
    .sort({createdAt:-1})
    .populate("autor", "name username imageUrl");

  res.status(200).send(comments);
};

const createComment = async(req, res) => {
  let {comment, content} = req.body;

  let newComment = new Comment({
    autor: req.userData._id,
    post: req.params.post_id,
    comment,
    content
  });

  await newComment.save();
  res.status(200).send({message: "Comentario Creado"});
};

const updateComment = async(req, res) => {
  let commentToUpdate = await Comment.findById(req.params.comment_id);
  if(!commentToUpdate) return res.status(404).send({message: "Comment no encontrado"});

  if(!req.userData.permissions.includes("admin")){
    if(!commentToUpdate.autor.equals(req.userData._id)) 
      return res.status(400).send({message: "Usuario no Autorizado"});
  }

  let {content} = req.body;
  commentToUpdate.content = content;

  await commentToUpdate.save();
  res.status(200).send({message: "Comentario Actualizado"});
};

const changeVisibility = async(req, res) => {
  let hiddenValue = req.body.hidden;
  if(hiddenValue != 1 && hiddenValue != 0) return res.status(400).send({message: "Algo salió mal"});

  await Comment.findByIdAndUpdate(req.params.comment_id, {hidden: hiddenValue});
  res.status(200).send({message: "Visibilidad cambiada"});
};

const deleteComment = async(req, res) => {
  let commentToDelete = await Comment.findById(req.params.comment_id);
  if(!commentToDelete) return res.status(404).send({message: "Comment no encontrado"});

  if(!req.userData.permissions.includes("admin")){
    if(!commentToDelete.autor.equals(req.userData._id)) 
      return res.status(400).send({message: "Usuario no Autorizado"});
  }

  await Comment.findByIdAndDelete(req.params.comment_id);
  res.status(200).send({message: "Comentario Eliminado"});
}; 

module.exports = {
  getCommentsByUser,
  getCommentsByPost,
  createComment,
  updateComment,
  changeVisibility,
  deleteComment
};