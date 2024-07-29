import { Comment } from "../../../db/modules/comment.model.js";
//add comment
export const addComment = async (req, res, next) => {
  //get data from req
  const { content, postId, userId } = req.body;
  //add to db
  const createdComment = await Comment.create({ content, postId, userId });
  if (!createdComment) {
    return res
      .status(500)
      .json({ massage: "fail to add comment", success: false });
  }
  return res
    .status(201)
    .json({
      massage: "comment add successfully",
      success: true,
      data: createdComment,
    });
};
//get all comment
export const getComment = async (req, res, next) => {
  const allComment = await Comment.findAll({
    attributes: ["content", "userId", "postId", "id"],
  });
  return res.status(200).json({ massage: allComment, success: true });
};
//update comment
export const updateComment = async (req, res, next) => {
    //get data from params
    const { id} = req.params;
    //get data from req
    const { content } = req.body;
    const findcomment = await Comment.findByPk(id); // {} , null
    if (!findcomment) {
      return res
        .status(404)
        .json({ massage: "post not found", success: false, data: { id } });
    }
    const updetedcomment = await Comment.update({ content }, { where: { id } });
    if (!updetedcomment) {
      return res
        .status(500)
        .json({ massage: "fail to update comment", success: false });
    }
    return res.status(201).json({
      massage: "comment updeted successfully",
      data: updetedcomment,
      success: true,
    });
  };
  
  //delete comment
  export const deleteComment = async (req, res, next) => {
    //get data from params
    const { id } = req.params;
    const FindToDeCommentlete = await Comment.findByPk(id)//{},Null
    if (!FindToDeCommentlete) {
      return res.status(404).json({massage : 'Comment not found' , success : false})
    }
    const CommentToDelete = await Comment.destroy({where : {id}})
    if (!CommentToDelete) {
      return res.status(500).json({massage : 'fail to delete comment' ,success : false})
    }
    return res.status(200).json({massage : "comment deleted successfully" , success : true})
  };
  