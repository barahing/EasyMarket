const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const getProductos = (request, response) => {
    connection.query("select * from tb_productos", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
 
//ruta
app.route("/bd_easy_market")
.get(getProductos);
/* 
const postColegio = (request, response) => {
    const {codigo, nombre, rector, nivelEducativo, acreditado} = request.body;
    connection.query("CALL insertarColegio (?,?,?,?,?)", 
    [codigo, nombre, rector, nivelEducativo, acreditado],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Colegio creado correctamente": results.affectedRows});
    });
};
 
//ruta
app.route("/colegio")
.post(postColegio);

const putColegio = (request, response) => {
    const {nombre, rector, nivelEducativo, acreditado, codigo} = request.body;
    connection.query("CALL actualizarColegio(?,?,?,?,?)",  // UPDATE
    [nombre, rector, nivelEducativo, acreditado, codigo],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Colegio modificado correctamente": results.affectedRows});
    });
};
 
//ruta
app.route("/colegio")
.put(putColegio);
 
const delColegio = (request, response) => {
    const codigo = request.params.codigo;
    connection.query("CALL borrarColegio(?)", 
    [codigo],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Colegio eliminado":results.affectedRows});
    });
};

//ruta
app.route("/colegio/:codigo")
.delete(delColegio);
*/
module.exports = app;