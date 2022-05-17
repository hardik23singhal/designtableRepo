import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {createProject} from "../controllers/Projects.js";
import {getProjects} from "../controllers/Projects.js";
import { deleteProject } from "../controllers/Projects.js";
import { editProject } from "../controllers/Projects.js";
import { updateProject } from "../controllers/Projects.js";
import { createClient } from "../controllers/Clients.js";
import conn from "../config/database_project.js";
const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.post('/project', createProject);
router.get('/project_list', verifyToken, getProjects);
// router.delete('/projects/delete-project/:id', (req, res, next)=> 
// {
//     conn.query(`DELETE FROM usersdb.projects WHERE id =${req.params.id}`, function(err, result) {
//         if (err) throw err;
//         console.log('record deleted');
        
//         res.status(200).json({result});
//       });
// });
router.delete('/projects/delete-project/:id', deleteProject);
router.get('/projects/update-project/:id',editProject).put('/projects/update-project/:id',updateProject);
router.post('/client', createClient);

export default router;