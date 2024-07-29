import { Router } from "express";
import { getusers, login, logout, signup } from "./user.controller.js";
const userRouter = Router()
//loge in 
userRouter.post('/login', login)
userRouter.post('/signup',signup)
userRouter.post('/logout' , logout)
userRouter.get('/getusers/:id/:postId',getusers)
export default userRouter