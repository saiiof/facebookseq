import { DataTypes } from "sequelize";
import { sequelize } from "../connictiondb.js";

export const User = sequelize.define('user',{
    name:{
        type : DataTypes.STRING,
        allowNull : false
    },
    email:{
        type : DataTypes.STRING,
        allowNull : false ,
        unique : true
    },
    password:{
        type : DataTypes.STRING,
        allowNull : false
    },
    loginStatus:{
        type : DataTypes.BOOLEAN,
        defaultValue : false
    }
})