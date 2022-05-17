//import '../models/ProjectModel.js';

import Projects from '../models/ProjectModel.js';
//import mysql from '../config/database_project';
//var db=require('../config/database_project');
//import Projects from '../models/ProjectModel.js';
//import conn from "../config/database_project.js";

//import Users from "../models/UserModel.js";

export const getProjects = async (req, res) => {
  try {
    //   var sql = `SELECT * FROM projects`;
    //  conn.query(sql, function(err, result) {
    //     if (err) throw err;
    //     console.log('record fetched');

    //     res.json(result);
    //   });

    const projects = await Projects.findAll({
      attributes: ['id','project_name', 'project_type', 'project_client']
    });
    res.json(projects);


  } catch (error) {
    console.log(error);
  }

  //  
}

export const createProject = async (req, res) => {

  // var conn = mysql.createConnection({
  //     host: 'localhost', // Replace with your host name
  //     user: 'db_user_1',      // Replace with your database username
  //     password: 'db_user_1',      // Replace with your database password
  //     database: 'usersdb' // // Replace with your database Name
  //   }); 

  //   conn.connect(function(err) {
  //     if (err) throw err;
  //     console.log('Database is connected successfully !');
  //   });
  //console.log(req.body);
  // console.log("create Proejct");
  var pname = req.body.project_name;
  var ptype = req.body.project_type;
  var pclient = req.body.project_client;

  try {

    await Projects.create({
      project_name: pname,
      project_type: ptype,
      project_client: pclient

    });
    res.json({ msg: " Project Created Succesfull!" });
  }
  catch (error) {
    console.log(error);
  }
  //   var sql = `INSERT INTO projects (project_name, project_type,project_client) VALUES ("${pname}", "${ptype}", "${pclient}")`;
  // conn.query(sql, function(err, result) {
  //   if (err) throw err;
  //   console.log(' Project record inserted');
  //   res.json({msg: " Project Created Succesfull!"});

  // });

  // try {
  //     console.log(ptype);
  //     await Projects.create({
  //        project_name : pname,
  //        project_type: ptype

  //     });
  //     res.json({msg: " Project Created Succesfull!"});
  // } catch (error) {
  //     console.log(error);
  // }
}

export const deleteProject = async (req, res) => {

  
  try {

    var id = req.params.id;
    
   // console.log(id);
    //   var sql = `DELETE FROM projects WHERE ID = ? `;
    //  conn.query(sql,[id], function(err, result) {
    //     if (err) throw err;
    //     console.log('record deleted');

    //     res.status(200).json({result});
    //   });


    const deleteProjectResult = await Projects.destroy({
      where: {
        id: id
      }
    });
//console.log(`${deleteProjectResult}`);
    res.status(200).json({ deleteProjectResult });

  } catch (error) {
    console.log(error);
  }


}

export const editProject = async (req, res) => {
  try {
    var id = req.params.id;

    const projects = await Projects.findAll({
      where: {
        id: id
      }
      //attributes:['project_name','project_type','project_client'],
    });
    res.json(projects);
    //   var sql = `SELECT * FROM projects WHERE ID = ? `;
    //  conn.query(sql,[id], function(err, result) {
    //     if (err) throw err;
    //     console.log('record edit fetched');
    //     console.log(result[0]);
    //     res.json({result});
    //   });


  } catch (error) {
    console.log(error);
  }

  //  
}

export const updateProject = async(req,res,next) =>
{
  console.log(req.body);
  Projects.update( {project_name :req.body.project_name , project_client : req.body.project_client, project_type: req.body.project_type
  },{where : {id : req.params.id}},(error,data)=> {
  // Projects.findByIdAndUpdate(req.params.id,{$set : req.body, },(error,data) => {
    if(error)
    {console.log(error);
      return next(error);
      
    }
    else {
      res.json(data);
      console.log("Data updated with success");
    }
  })
}