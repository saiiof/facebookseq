import { Sequelize, DataTypes } from "sequelize";
// connect to db
export const sequelize = new Sequelize('mysql://u8dkldntfh0enqih:jqksOSX4Aje0Q6ZUiQH9@bga4qixkf0dqyhqfrzxr-mysql.services.clever-cloud.com:3306/bga4qixkf0dqyhqfrzxr');

export const CONNECTDB =()=> { sequelize.authenticate().then( ()=> 
    {console.log("db connected successfully");}
).catch((err)=> {
    console.log("fail to connecet db",err);
})}
sequelize.sync({
    alter :false,
    force : false
})