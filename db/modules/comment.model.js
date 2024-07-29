import { DataTypes } from "sequelize";
import { sequelize } from "../connictiondb.js";
import { Post } from "./post.model.js";
import { User } from "./user.model.js";
/*
Define a Sequelize model for comments with the following
fields: content, postId (linked to the post model), and userId
(linked to the User model). */
export const Comment = sequelize.define('comment',{
    content:{
        type : DataTypes.STRING,
        allowNull : false
    }
})
// linked between post and comment
Post.hasMany(Comment,{
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE'
})
Comment.belongsTo(Post)

// linked between user and comment
User.hasMany(Comment,{
     onDelete : 'CASCADE',
    onUpdate : 'CASCADE'
})
Comment.belongsTo(User)