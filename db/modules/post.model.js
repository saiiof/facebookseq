import { DataTypes } from "sequelize";
import { sequelize } from "../connictiondb.js";
import { User } from "./user.model.js";

export const Post = sequelize.define("post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});
User.hasMany(Post, {
  onUpdate: "CASCADE",
  onDelete: "CASCADE"
});
Post.belongsTo(User)