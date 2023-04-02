const Comment = require('../models/Comment');

const getCommentsByUser = async(req, res) => {
  let comments = await Comment.find({author: req.params.user_id})
    .sort({createdAt:-1})
    .limit(10)
    .populate("post", "title imageUrl");

  res.status(200).send(comments);
};

const getCommentsByPost = async(req, res) => {
  let comments = await Comment.find({post: req.params.post_id, parentComment: null})
    .sort({createdAt:1})
    .populate("author", "name username imageUrl permissions")
    .populate({path:"replies", populate:{path: "author", model: "User", select: "name username imageUrl permissions"}});

  res.status(200).send(comments);
};

const createComment = async(req, res) => {
  try{

    let {parentComment, content} = req.body;
    let parent = new Comment;
  
    if(parentComment) {
      try{
        parent = await Comment.findOne({_id: parentComment, post: req.params.post_id, parentComment: null});
        if(!parent._id) throw new Error("Comentario no encontrado");
      } catch(e) {
        return res.status(400).send({message: "Algo salió mal. Comentario padre no encontrado", error: e.message});
      }
    }
  
    let newComment = new Comment({
      author: req.userData._id,
      post: req.params.post_id,
      parentComment,
      content
    });
  
    let commentCreated = await newComment.save();
    if(commentCreated.parentComment){
      console.log(commentCreated._id);
      parent.replies.push(commentCreated._id);
      await parent.save({timestamps: false});
    }
  
    res.status(200).send({message: "Comentario Creado"});

  } catch(e) {
    console.log(e);
    res.status(500).send({message: "Algo salió mal", error: e.message});
  }
};

const updateComment = async(req, res) => {
  let commentToUpdate = await Comment.findById(req.params.comment_id);
  if(!commentToUpdate) return res.status(404).send({message: "Comment no encontrado"});

  if(!req.userData.permissions.includes("admin")){
    if(!commentToUpdate.author.equals(req.userData._id)) 
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
    if(!commentToDelete.author.equals(req.userData._id)) 
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