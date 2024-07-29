//import medules 
import express from "express";
import { CONNECTDB } from "./db/connictiondb.js";
import userRouter from "./src/modules/user/user.router.js";
import postRouter from "./src/modules/post/post.router.js";
import commentRouter from "./src/modules/comment/comment.router.js";
const app = express()
const port = 3050
CONNECTDB()
app.use(express.json())
app.use(userRouter)
app.use(postRouter)
app.use(commentRouter)
app.listen(port ,()=>{
console.log('server is running on port ', port);
})