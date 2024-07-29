import { Router } from "express";
import { addPost, deletePost, getAllPost, getPost, updatePost } from "./post.controller.js";

const postRouter = Router();

postRouter.post("/addPost",addPost);
postRouter.get('/getAllPost',getAllPost)
postRouter.put('/updatePost/:id',updatePost)
postRouter.delete('/deletePost/:id',deletePost)

postRouter.get('/getpost/:id',getPost)
export default postRouter;
