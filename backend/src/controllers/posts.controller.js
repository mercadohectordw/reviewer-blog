const Post = require('../models/Post');

const getPostsByAuthor = async(req, res) => {
  let post = await Post.find({author:req.params.author_id}, "-content -author")
    .sort({createdAt:-1});

  res.status(200).send(post);
};

const getPost = async(req, res) => {
  let post = await Post.findById(req.params.post_id)
    .populate("author", "username name imageUrl bio");

  if(!post) return res.status(400).send({message: "Post no encontrado"});
  res.status(200).send(post);
};

const getAll = async(req, res) => {
  let posts = await Post.find({}, "-content -hidden")
    .sort({createdAt:-1})
    .populate("author", "username name imageUrl");

  res.status(200).send(posts);
};

const createPost = async(req, res) => {
  let {title, imageUrl, content, tags} = req.body;

  let newPost = new Post({
    title,
    imageUrl,
    content,
    author: req.userData._id,
    tags
  });

  try{
    let postCreated = await newPost.save();
    res.status(200).send({message: "Post Creado", post: postCreated._id});

  } catch(e) {
    res.status(400).send({message: "Algo salió mal", error: e.message});
  }
};

const updatePost = async(req, res) => {
  let postToUpdate = await Post.findById(req.params.post_id);
  if(!postToUpdate) return res.status(404).send({message: "Post no encontrado"});

  if(req.userData.permissions.includes("autor") && !req.userData.permissions.includes("admin")){
    if(!postToUpdate.author.equals(req.userData._id)){
      return res.status(400).send({message: "Autor No Autorizado"});
    }
  }

  let{title, imageUrl, content, tags} = req.body;

  postToUpdate.title = title;
  postToUpdate.imageUrl = imageUrl;
  postToUpdate.content = content;
  postToUpdate.tags = tags;

  await postToUpdate.save();
  res.status(200).send({message: "Post Actualizado"});
};

const changeVisibility = async(req, res) => {
  let hiddenValue = req.body.hidden;
  if(hiddenValue != 1 && hiddenValue != 0) return res.status(400).send({message: "Algo salió mal"});

  await Post.findByIdAndUpdate(req.params.post_id, {hidden: hiddenValue});
  res.status(200).send({message: "Visibilidad cambiada"});
};

const deletePost = async(req, res) => {
  await Post.findByIdAndDelete(req.params.post_id);
  res.status(200).send({message: "Post Eliminado"});
};

module.exports = {
  getPostsByAuthor,
  getPost,
  getAll,
  createPost,
  updatePost,
  changeVisibility,
  deletePost
};