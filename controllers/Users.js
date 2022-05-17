import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//import conn from "../config/database_project.js";
import { json } from "express";
//import { json } from "sequelize/types";

export const getUsers = async (req, res) => {
    try {
        // var sql = `SELECT * FROM users `;
        // conn.query(sql, function (err, result) {
        //     if (err) throw err;
        //     console.log('record Fetched');

        //     res.json(result);

        // });
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async (req, res) => {
    const { name, email, password, confPassword } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password do not match" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        // var sql = `INSERT INTO users (name, email, password) VALUES ("${name}", "${email}", "${hashPassword}")`;
        // conn.query(sql, function (err, result) {
        //     if (err) throw err;
        //     console.log(' User record inserted');
        //     res.json({ msg: " User Created Succesfully" });
        // });
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
      
          });
          res.json({ msg: " User Created Succesfully" });
    }
    catch (error) {
        console.log(error);
    }
}


export const Login = async (req, res) => {

    try {
        const user = await Users.findAll({
            where: {
                email: req.body.email
            }
        });
        // let user;
        // const setResult = (data) => {
        //     user = data;
        //     // console.log(user[0].id);
        // }
        // var reqEmail = req.body.email;
        // var user=[];
        // var sql = `SELECT * FROM users WHERE email= ("${reqEmail}")`;
        // conn.query(sql, function (err, result) {
        //     if (err) {
        //         throw err;
        //     }
        //     else {
        //         //console.log(result);
        //         // setResult(result);
        //         user= result;
        //     }

        // });
        const match = bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({ msg: "Wrong Password" });
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        console.log(email);

        const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });


        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        });
        // var sql = `UPDATE users SET refresh_token = ("${refreshToken}") WHERE id = ("${userId}")`;
        // conn.query(sql, function (err, result) {
        //     if (err) {
        //         throw err;
        //     }
        //     else{
        //         console.log(result);
        //     }


        // });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({ msg: "Email not found" });
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}