import bcrypt from "bcrypt";
import { User } from "../../../db/modules/user.model.js";
import { Post } from "../../../db/modules/post.model.js";
import { where } from "sequelize";
import { Comment } from "../../../db/modules/comment.model.js";
//sign up
export const signup = async (req, res, next) => {
  //get data from req
  let { name, email, password } = req.body;
  //check existence
  const userExiste = await User.findOne({ where: { email } }); // {} , null
  if (userExiste) {
    return res
      .status(409)
      .json({ massage: "email already existe", success: false });
  }
  //hash password
  password = bcrypt.hashSync(password, 10);
  // add to db
  const createUser = await User.create({ name, email, password });
  if (!createUser) {
    return res
      .status(500)
      .json({ massage: "fail to add to db", success: false });
  }
  return res.status(201).json({
    massage: "user add successfully",
    success: true,
    data: createUser,
  });
};
//login
export const login = async (req, res, next) => {
  //get data from req
  let { email, password } = req.body;
  //check email & password
  const userExiste = await User.findOne({
    where: { email },
  });
  if (!userExiste) {
    return res
      .status(404)
      .json({ massage: "email or password is wrong", success: false });
  }
  //comper password
  const isPassowred = bcrypt.compareSync(password, userExiste.password);
  if (!isPassowred) {
    return res
      .status(404)
      .json({ massage: "email or password is wrong", success: false });
  }
  const loginStatus = await userExiste.update({ loginStatus: true });
  return res.status(200).json({ massgae: "welcom :} ", success: true });
};
// logout
export const logout = async (req, res,next) => {
  //get data from req
  const { email, password } = req.body;
  //check data
  const userExiste = await User.findOne({
    where: { email },
  });
  //comper password
  const isPassowred = bcrypt.compareSync(password, userExiste.password);
  if (!isPassowred || !userExiste) {
    return res
      .status(404)
      .json({ massage: "email or password is wrong", success: false });
  }
  const loginStatus = await userExiste.update({ loginStatus: false });
  return res
    .status(200)
    .json({
      massgae: "user logged out successfully",
      success: true,
      loginStatus: userExiste.loginStatus,
    });
};
// get specific user with specific post
export const getusers = async (req,res,next) => {
//get data from params
const {id,postId} =req.params
console.log(id,postId);
//finde user
const findUser = await User.findOne({where :{id}})
if (!findUser) {
  return res.status(404).json({massage : 'user not found' , success : false})
}

//finde post related to user
const findPost = await Post.findOne({where :{id : postId , userId :id}})
if (!findPost) {
  return res.status(404).json({massage : 'post not found' , success : false})
}

//finde commmen related to post and user
const findComment = await Comment.findOne({where :{postId : postId , userId :id}})
if (!findComment) {
  return res.status(404).json({massage : 'comment not found' , success : false})
}
return res.status(200).json({massage : {findUser,findPost,findComment} , success : true})
}
