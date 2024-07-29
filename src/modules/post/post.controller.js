import { where } from "sequelize";
import { Post } from "../../../db/modules/post.model.js";
import { User } from "../../../db/modules/user.model.js";
//add post
export const addPost = async (req, res, next) => {
  //get data from req
  const { title, content, userId } = req.body;
  // check user existence
  const userExiste = await User.findByPk(userId);
  if (!userExiste) {
    return res.status(404).json({ massage: "user not found", success: false });
  }
  if (!userExiste.loginStatus) {
    return res.json({ massage: "user can not add posts", success: false });
  }
  const createdPost = await Post.create({ title, content, userId });
  if (!createdPost) {
    return res
      .status(500)
      .json({ massage: "fail to creat post", success: false });
  }
  return res
    .status(201)
    .json({ massage: "post add successfully", success: true });
};

//read post
export const getAllPost = async (req, res, next) => {
  const allPosts = await Post.findAll({
    attributes: ["title", "content", "userId"],
  });
  return res.status(200).json({ massage: allPosts, success: true });
};

//updating post
export const updatePost = async (req, res, next) => {
  //get data from params
  const { id } = req.params;
  //get data from req
  const { title, content } = req.body;
  const findPost = await Post.findByPk(id); // {} , null
  if (!findPost) {
    return res
      .status(404)
      .json({ massage: "post not found", success: false, data: { id } });
  }
  const updetedPost = await Post.update({ title, content }, { where: { id } });
  if (!updetedPost) {
    return res
      .status(500)
      .json({ massage: "fail to update post", success: false });
  }
  return res.status(201).json({
    massage: "post updeted successfully",
    data: updetedPost,
    success: true,
  });
};

//delete post
export const deletePost = async (req, res, next) => {
  //get data from params
  const { id } = req.params;
  const FindPostToDelete = await Post.findByPk(id); //{},Null
  if (!FindPostToDelete) {
    return res.status(404).json({ massage: "post not found", success: false });
  }
  const PostToDelete = await Post.destroy({ where: { id } });
  if (!PostToDelete) {
    return res
      .status(500)
      .json({ massage: "fail to delete post", success: false });
  }
  return res
    .status(200)
    .json({ massage: "post deleted successfully", success: true });
};

//get specific post whith auther
export const getPost = async (req, res, next) => {
  //get data from params
  const { id } = req.params;
  console.log(id);
  const findPost = await Post.findOne({ where: { id } });
  if (!findPost) {
    return res.status(404).json({massage : "post not found" , succes : false})
  }
  const findUser = await User.findOne({ where: { id : findPost.userId } });
  return res.status(200).json({massage : {findPost, ...findUser}, success : true})
};
