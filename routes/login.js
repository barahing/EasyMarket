const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const getPassword = (request, response) => {
    
    connection.query("select contrasena_usuario from tb_usuarios",
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
 
//ruta
app.route("/login/")
.get(getPassword);

const postLogin = (request, response) => {
    console.log("Request.body" + request.body);
    const {id_usuario, contrasena_usuario} = request.body;
    console.log(id_usuario, contrasena_usuario);
    connection.query("CALL validateAuthentication(?,?)", [id_usuario, contrasena_usuario],
    (error,results) => {
        if(error)
            throw error;
        response.status(201).json(results);
        if (results[0].length!=0)
           return true;
        else 
            return false;
    });
}

app.route("/login/")
.post(postLogin);

module.exports = app;