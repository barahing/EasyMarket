const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const putUser = (request, response) => {
	const {nombre_usuario, id_ciudad, direccion, rol, estado, correo_usuario, telefono_usuario, id_usuario} = request.body;
	connection.query("CALL updateClient(?,?,?,?,?,?,?,?)",  // UPDATE
	[nombre_usuario, id_ciudad, direccion, rol, estado, correo_usuario, telefono_usuario, id_usuario],
	(error, results) => {
		if(error)
			throw error;
		response.status(201).json({"Usuario modificado correctamente": results.affectedRows});
	});
};
 
app.route("/userManagement")
.put(putUser);


const getClient = (request, response) => {
	connection.query("SELECT * FROM tb_usuarios", 
	(error, results) => {
		if(error)
			throw error;
		response.status(201).json(results);
	});
};
 
//ruta
app.route("/userManagement")
.get(getClient);

 
const postUser = (request, response) => {
	console.log(request.body);
	const {id_usuario, nombre_usuario, id_ciudad, direccion, rol, estado, contrasena_usuario, correo_usuario, telefono_usuario} = request.body;
	
	connection.query("CALL createUser (?,?,?,?,?,?,?,?,?)", 
	[id_usuario, nombre_usuario, id_ciudad, direccion, 2, 1, contrasena_usuario, correo_usuario,  telefono_usuario],
	(error, results) => {
		if(error)
			throw error;
		response.status(201).json({"Usuario creado correctamente": results.affectedRows});
	});
};
//ruta
app.route("/userManagement/")
.post(postUser);


const delUser = (request, response) => {
	const id_usuario = request.params.id;
	connection.query("CALL deleteUser(?)", 
	[id_usuario],
	(error, results) => {
		if(error)
			throw error;
		response.status(201).json({"Usuario eliminado correctamente":results.affectedRows});
	});
};

//ruta
app.route("/userManagement/:id")
.delete(delUser);

module.exports = app;