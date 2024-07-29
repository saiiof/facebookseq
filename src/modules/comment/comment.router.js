import { Router } from "express";
import { addComment, deleteComment, getComment, updateComment } from "./comment.controller.js";

const commentRouter = Router()
commentRouter.post('/addComment',addComment)
commentRouter.get('/getPosts',getComment)
commentRouter.put('/updateComment/:id',updateComment)
commentRouter.delete('/deleteComment/:id',deleteComment)
export default commentRouter 