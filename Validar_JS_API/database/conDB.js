const { Sequelize } = require('sequelize');
require('dotenv').config();

//conexion con la BD
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASS,
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT
    }
);

module.exports = sequelize;