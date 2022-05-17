import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Projects = db.define('projects',{
    // id : {type : DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement : true,
    //     allowNull : false
    // },
    
    project_name:{
        type: DataTypes.STRING
    },
    project_type:{
        type: DataTypes.STRING
    },
    project_client:{
        type: DataTypes.STRING
    },
    
    
},{
    timestamps:false
});

export default Projects;