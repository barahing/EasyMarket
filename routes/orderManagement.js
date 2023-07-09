const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const getOrders = (request, response) => {
	connection.query("CALL getOrders", 
	(error, results) => {
		if(error)
			throw error;
		response.status(200).json(results);
	});
};
 
//ruta
app.route("/orderManagement")
.get(getOrders);

const putOrder = (request, response) => {
	const {estado, id_pedido} = request.body;
	connection.query("CALL updateOrder(?,?)",  // UPDATE
	[estado, id_pedido],
	(error, results) => {
		if(error)
			throw error;
		response.status(201).json({"Entrega confirmada correctamente": results.affectedRows});
	});
};
 
app.route("/orderManagement")
.put(putOrder);


const delOrder = (request, response) => {
	const id_pedido = request.params.id_pedido;
	connection.query("CALL cancelOrder(?)", 
	[id_pedido],
	(error, results) => {
		if(error)
			throw error;
		response.status(201).json({"Pedido cancelado":results.affectedRows});
	});
};

//ruta
app.route("/orderManagement/:id_pedido")
.delete(delOrder);


module.exports = app;