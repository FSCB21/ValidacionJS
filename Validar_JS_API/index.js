const express = require('express');
const app = express();
const sequelize = require('./database/conDB')

//para poder usar las variables de proyecto
require('dotenv').config();

// Ajustes del puerto
const PORT = process.env.PORT || 3000;

// Pasar parametros por el body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Solucion A cors
const cors = require('./midelwares/CORS/cors')
//referencia a la carpeta de rutas
app.use('/',cors, require('./routers/router'));

// Arrancamos el servidor
app.listen(PORT, function () {
    console.log(`El proyecto ha arrancado en http://localhost:${PORT}`);
    
    // Definir BD
    sequelize.sync({ force: false }).then(() => {
        console.log("Nos hemos conectado a la base de datos");
    }).catch(error => {
        console.log('Se ha producido un error en la conexion con la BD', error);
    }) 
    
});