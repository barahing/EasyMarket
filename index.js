const express = require("express");
const app = express();
 
//Analizar el cuerpo de la solicitud POST
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));
console.log("Dirname" + __dirname);

 
//Archivo de rutas definidas

app.use(require('./routes/login'));
app.use(require('./routes/userManagement'));
//app.use(require('./routes/bd_easy_market'));
app.use(require('./routes/orderManagement'));
app.use(require('./routes/searchUser'));
 
app.listen(/*process.env.PORT||*/5500,() => {
	console.log("Servidor ejecutandose en el puerto 5500");
});

module.exports = app;