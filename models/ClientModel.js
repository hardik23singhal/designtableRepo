import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Clients = db.define('clients',{
    // id : {type : DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement : true,
    //     allowNull : false
    // },
    
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    phone:{
        type: DataTypes.INTEGER
    },
    
    
},{
    timestamps:false
});

export default Clients;